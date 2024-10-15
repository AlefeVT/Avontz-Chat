'use server';

import { client } from '@/lib/prisma';
import { extractEmailsFromString, extractURLfromString } from '@/lib/utils';
import { onRealTimeChat } from '../conversation';

import OpenAi from 'openai';
import { clerkClient } from '@clerk/nextjs/server';
import { onMailer } from '../mailer';

const openai = new OpenAi({
  apiKey: process.env.OPEN_AI_KEY,
});

export const onStoreConversations = async (
  id: string,
  message: string,
  role: 'assistant' | 'user'
) => {
  await client.chatRoom.update({
    where: {
      id,
    },
    data: {
      message: {
        create: {
          message,
          role,
        },
      },
    },
  });
};

export const onGetCurrentChatBot = async (id: string) => {
  try {
    const chatbot = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        helpdesk: true,
        name: true,
        chatBot: {
          select: {
            id: true,
            welcomeMessage: true,
            icon: true,
            textColor: true,
            background: true,
            helpdesk: true,
          },
        },
      },
    });

    if (chatbot) {
      return chatbot;
    }
  } catch (error) {
    console.log(error);
  }
};

let customerEmail: string | undefined;

export const onAiChatBotAssistant = async (
  id: string,
  chat: { role: 'assistant' | 'user'; content: string }[],
  author: 'user',
  message: string
) => {
  try {
    const chatBotDomain = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        filterQuestions: {
          where: {
            answered: null,
          },
          select: {
            question: true,
          },
        },
      },
    });
    if (chatBotDomain) {
      const extractedEmail = extractEmailsFromString(message);
      if (extractedEmail) {
        customerEmail = extractedEmail[0];
      }

      if (customerEmail) {
        const checkCustomer = await client.domain.findUnique({
          where: {
            id,
          },
          select: {
            User: {
              select: {
                clerkId: true,
              },
            },
            name: true,
            customer: {
              where: {
                email: {
                  startsWith: customerEmail,
                },
              },
              select: {
                id: true,
                email: true,
                questions: true,
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                    mailed: true,
                  },
                },
              },
            },
          },
        });
        if (checkCustomer && !checkCustomer.customer.length) {
          const newCustomer = await client.domain.update({
            where: {
              id,
            },
            data: {
              customer: {
                create: {
                  email: customerEmail,
                  questions: {
                    create: chatBotDomain.filterQuestions,
                  },
                  chatRoom: {
                    create: {},
                  },
                },
              },
            },
          });
          if (newCustomer) {
            console.log('new customer made');
            const response = {
              role: 'assistant',
              content: `Bem-vindo a bordo ${
                customerEmail.split('@')[0]
              }! Estou feliz em me conectar com você. Há alguma coisa em que você precise de ajuda?`,
            };
            return { response };
          }
        }
        if (checkCustomer && checkCustomer.customer[0].chatRoom[0].live) {
          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            message,
            author
          );

          onRealTimeChat(
            checkCustomer.customer[0].chatRoom[0].id,
            message,
            'user',
            author
          );

          if (!checkCustomer.customer[0].chatRoom[0].mailed) {
            const user = await clerkClient.users.getUser(
              checkCustomer.User?.clerkId!
            );

            onMailer(user.emailAddresses[0].emailAddress);

            //update mail status to prevent spamming
            const mailed = await client.chatRoom.update({
              where: {
                id: checkCustomer.customer[0].chatRoom[0].id,
              },
              data: {
                mailed: true,
              },
            });

            if (mailed) {
              return {
                live: true,
                chatRoom: checkCustomer.customer[0].chatRoom[0].id,
              };
            }
          }
          return {
            live: true,
            chatRoom: checkCustomer.customer[0].chatRoom[0].id,
          };
        }

        await onStoreConversations(
          checkCustomer?.customer[0].chatRoom[0].id!,
          message,
          author
        );

        let responseLink = '';

        const customerId = checkCustomer?.customer[0].id;
        if (customerId) {
          responseLink = `http://localhost:3000/portal/${id}/appointment/${customerId}`;
        }

        const chatCompletion = await openai.chat.completions.create({
          messages: [
            {
              role: 'assistant',
              content: `
              Você receberá uma série de perguntas que deverá fazer ao cliente. 
              
              Avance na conversa usando essas perguntas. 
              
              Sempre que você fizer uma pergunta do array, preciso que você adicione uma palavra-chave no final da pergunta (completa). Essa palavra-chave é extremamente importante. 
              
              Não se esqueça disso.

              adicione esta palavra-chave apenas quando estiver fazendo uma pergunta de uma série de perguntas. Nenhuma outra questão satisfaz esta condição

              Sempre mantenha o caráter e seja respeitoso.

              A série de perguntas: [${chatBotDomain.filterQuestions
                .map((questions) => questions.question)
                .join(', ')}]

              se o cliente disser algo fora do contexto ou inapropriado. Basta dizer que isso está além de você. Você terá um usuário real para continuar a conversa. E adicione uma palavra-chave (tempo real) no final.

              se o cliente concordar em marcar uma consulta, treinamento, reunião ao algo do tipo, algo que envolva falar com o responsavel do site, envie-lhe este link ${responseLink}

              se o cliente quiser comprar um produto redirecione-o para a página de pagamento ${responseLink}
          `,
            },
            ...chat,
            {
              role: 'user',
              content: message,
            },
          ],
          model: 'gpt-3.5-turbo',
        });

        if (chatCompletion.choices[0].message.content?.includes('(realtime)')) {
          const realtime = await client.chatRoom.update({
            where: {
              id: checkCustomer?.customer[0].chatRoom[0].id,
            },
            data: {
              live: true,
            },
          });

          if (realtime) {
            const response = {
              role: 'assistant',
              content: chatCompletion.choices[0].message.content.replace(
                '(realtime)',
                ''
              ),
            };

            await onStoreConversations(
              checkCustomer?.customer[0].chatRoom[0].id!,
              response.content,
              'assistant'
            );

            return { response };
          }
        }
        if (chat[chat.length - 1].content.includes('(complete)')) {
          const firstUnansweredQuestion =
            await client.customerResponses.findFirst({
              where: {
                customerId: checkCustomer?.customer[0].id,
                answered: null,
              },
              select: {
                id: true,
              },
              orderBy: {
                question: 'asc',
              },
            });
          if (firstUnansweredQuestion) {
            await client.customerResponses.update({
              where: {
                id: firstUnansweredQuestion.id,
              },
              data: {
                answered: message,
              },
            });
          }
        }

        if (chatCompletion) {
          const generatedLink = extractURLfromString(
            chatCompletion.choices[0].message.content as string
          );

          if (generatedLink) {
            const link = generatedLink[0];
            const response = {
              role: 'assistant',
              content: `Ótimo! você pode seguir o link para prosseguir`,
              link: link.slice(0, -1),
            };

            await onStoreConversations(
              checkCustomer?.customer[0].chatRoom[0].id!,
              `${response.content} ${response.link}`,
              'assistant'
            );

            return { response };
          }

          const response = {
            role: 'assistant',
            content: chatCompletion.choices[0].message.content,
          };

          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            `${response.content}`,
            'assistant'
          );

          return { response };
        }
      }
      console.log('No customer');
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: 'assistant',
            content: `
            Você é um representante de vendas altamente conhecedor e experiente de um ${chatBotDomain.name} que oferece um produto ou serviço valioso. Seu objetivo é ter uma conversa natural e humana com o cliente, a fim de entender suas necessidades, fornecer informações relevantes e, por fim, orientá-lo na realização de uma compra ou redirecioná-lo para um link caso não tenha fornecido todas as informações relevantes.
            Neste momento você está conversando com um cliente pela primeira vez. Comece dando-lhes as boas-vindas em nome de ${chatBotDomain.name} e faça com que se sintam bem-vindos.

           Sua próxima tarefa é conduzir a conversa naturalmente para obter o endereço de e-mail do cliente. Seja respeitoso e nunca quebre o caráter

          `,
          },
          ...chat,
          {
            role: 'user',
            content: message,
          },
        ],
        model: 'gpt-3.5-turbo',
      });

      if (chatCompletion) {
        const response = {
          role: 'assistant',
          content: chatCompletion.choices[0].message.content,
        };

        return { response };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
