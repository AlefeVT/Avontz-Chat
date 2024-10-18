'use server';

import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { addDays } from 'date-fns';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: '2024-09-30.acacia',
});

export const onConectStripeUser = async (stripeAccountId: string) => {
  try {
    const user = await currentUser();
    
    if (!user) {
      throw new Error('Usuário não autenticado.');
    }

    await client.user.update({
      where: { clerkId: user.id },
      data: { stripeId: stripeAccountId },
    });

    return { status: 200, message: 'Stripe ID salvo com sucesso.' };
  } catch (error) {
    console.error('Erro ao salvar Stripe ID:', error);
    return { status: 500, message: 'Erro ao salvar Stripe ID.' };
  }
};

export const onCreateCustomerPaymentIntentSecret = async (
  amount: number,
  stripeId: string
) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create(
      {
        currency: 'brl',
        amount: amount * 100,
        automatic_payment_methods: {
          enabled: true,
        },
      },
      { stripeAccount: stripeId }
    );

    if (paymentIntent) {
      return { secret: paymentIntent.client_secret };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateSubscription = async (
  plan: 'Simples' | 'Ultimate' | 'Plus'
) => {
  try {
    const user = await currentUser();
    if (!user) return;

    // Define a data de expiração para 30 dias no futuro, independente do plano escolhido
    const expirationDate = addDays(new Date(), 30);

    // Atualiza apenas isCanceled, planExpirationDate e pendingPlan, sem alterar o plano imediatamente
    const update = await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        subscription: {
          update: {
            data: {
              planExpirationDate: expirationDate, // Define a data de expiração para 30 dias no futuro
              pendingPlan: plan, // O novo plano será salvo em pendingPlan
              paidAt: new Date(), // Data de pagamento ou atualização
            },
          },
        },
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (update) {
      return {
        status: 200,
        message: `A mudança para o plano "${plan}" foi agendada para daqui a 30 dias.`,
        plan: update.subscription?.plan,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkAndUpdateSubscription = async () => {
  const user = await currentUser();
  if (!user) return;


  console.log("CHAMOU A FUNÇÂO QUE VERIFICA PLANO");
  
  // Buscar a assinatura atual do usuário
  const subscription = await client.user.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      subscription: {
        select: {
          planExpirationDate: true,
          pendingPlan: true, // Buscar o novo plano pendente
          plan: true,
        },
      },
    },
  });

  if (subscription?.subscription && subscription.subscription.planExpirationDate) {
    const today = new Date();

    // Verificar se a data de expiração chegou
    if (today >= new Date(subscription.subscription.planExpirationDate)) {
      const newPlan = subscription.subscription.pendingPlan;

      // Atualiza o plano para o novo plano após os 30 dias, se o pendingPlan não for null
      await client.user.update({
        where: { clerkId: user.id },
        data: {
          subscription: {
            update: {
              plan: newPlan || undefined, // Define o plano como undefined se pendingPlan for null
              credits: newPlan === 'Ultimate' ? 50 : newPlan === 'Plus' ? 500 : 10,
              planExpirationDate: null, // Resetar a data de expiração
              pendingPlan: null, // Limpar o plano pendente
            },
          },
        },
      });
    }
  }
};


const setPlanAmount = (item: 'Simples' | 'Ultimate' | 'Plus') => {
  if (item == 'Ultimate') {
    return 1500;
  }
  if (item == 'Plus') {
    return 3500;
  }
  return 0;
};

export const onGetStripeClientSecret = async (
  item: 'Simples' | 'Ultimate' | 'Plus'
) => {
  try {
    const amount = setPlanAmount(item);
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'brl',
      amount: amount,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (paymentIntent) {
      return { secret: paymentIntent.client_secret };
    }
  } catch (error) {
    console.log(error);
  }
};
