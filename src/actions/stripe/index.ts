'use server';

import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

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
    const update = await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        subscription: {
          update: {
            data: {
              plan,
              credits: plan == 'Ultimate' ? 50 : plan == 'Plus' ? 500 : 10,
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
        message: 'assinatura atualizada',
        plan: update.subscription?.plan,
      };
    }
  } catch (error) {
    console.log(error);
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
