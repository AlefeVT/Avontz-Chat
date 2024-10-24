'use server';

import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export const onGetDomainProductsAndConnectedAccountId = async (id: string) => {
  try {
    const connectedAccount = await client.domain.findUnique({
      where: {
        id,
      },
      select: {
        User: {
          select: {
            stripeId: true,
          },
        },
      },
    });

    const products = await client.product.findMany({
      where: {
        domainId: id,
      },
      select: {
        price: true,
        name: true,
        image: true,
      },
    });

    if (products) {
      const totalAmount = products.reduce((current, next) => {
        return current + next.price;
      }, 0);
      return {
        products: products,
        amount: totalAmount,
        stripeId: connectedAccount?.User?.stripeId,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const onDomainCustomerResponses = async (customerId: string) => {
  try {
    const customerQuestions = await client.customer.findUnique({
      where: {
        id: customerId,
      },
      select: {
        email: true,
        questions: {
          select: {
            id: true,
            question: true,
            answered: true,
          },
        },
      },
    });

    if (customerQuestions) {
      return customerQuestions;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllDomainBookings = async (domainId: string) => {
  try {
    const bookings = await client.bookings.findMany({
      where: {
        domainId,
      },
      select: {
        slot: true,
        date: true,
      },
    });

    if (bookings) {
      return bookings;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onBookNewAppointment = async (
  domainId: string,
  customerId: string,
  slot: string,
  date: string,
  email: string
) => {
  try {
    const booking = await client.customer.update({
      where: {
        id: customerId,
      },
      data: {
        booking: {
          create: {
            domainId,
            slot,
            date,
            email,
          },
        },
      },
    });

    if (booking) {
      return { status: 200, message: 'Reserva criada' };
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveAnswers = async (
  questions: [question: string],
  customerId: string
) => {
  try {
    for (const question in questions) {
      await client.customer.update({
        where: { id: customerId },
        data: {
          questions: {
            update: {
              where: {
                id: question,
              },
              data: {
                answered: questions[question],
              },
            },
          },
        },
      });
    }
    return {
      status: 200,
      messege: 'Respostas atualizadas',
    };
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllBookingsForCurrentUser = async (clerkId: string) => {
  try {
    const bookings = await client.bookings.findMany({
      where: {
        Customer: {
          Domain: {
            User: {
              clerkId,
            },
          },
        },
      },
      select: {
        id: true,
        slot: true,
        createdAt: true,
        date: true,
        email: true,
        domainId: true,
        Customer: {
          select: {
            Domain: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (bookings) {
      return {
        bookings,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserAppointments = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const bookings = await client.bookings.count({
        where: {
          Customer: {
            Domain: {
              User: {
                clerkId: user.id,
              },
            },
          },
        },
      });

      if (bookings) {
        return bookings;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
