'use client';
import { Loader } from '@/components/loader';
import { StripeElements } from '@/components/settings/stripe-elements';
import SubscriptionCard from '@/components/settings/subscription-card';
import { Button } from '@/components/ui/button';
import { useSubscriptions } from '@/hooks/billing/use-billing';

import React from 'react';

type Props = {
  plan: 'Simples' | 'Ultimate' | 'Plus';
};

const SubscriptionForm = ({ plan }: Props) => {
  const { loading, onSetPayment, payment, onUpdatetToFreTier } =
    useSubscriptions(plan);

  return (
    <Loader loading={loading}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <SubscriptionCard
            title="Simples"
            description="Perfeito se você está apenas começando com Avontz-Chat"
            price="0"
            payment={payment}
            onPayment={onSetPayment}
            id="Simples"
          />

          <SubscriptionCard
            title="Ultimate"
            description="Perfeito se você está apenas começando com o Avontz-Chat"
            price="15"
            payment={payment}
            onPayment={onSetPayment}
            id="Ultimate"
          />

          <SubscriptionCard
            title="Plus"
            description="Perfeito se você está apenas começando com o Avontz-Chat"
            price="35"
            payment={payment}
            onPayment={onSetPayment}
            id="Plus"
          />
        </div>
        <StripeElements payment={payment} />
        {payment === 'Simples' && (
          <Button onClick={onUpdatetToFreTier}>
            <Loader loading={loading}>Confirmar</Loader>
          </Button>
        )}
      </div>
    </Loader>
  );
};

export default SubscriptionForm;
