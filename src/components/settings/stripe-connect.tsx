'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Loader } from '../loader';
import { useStripe } from '@/hooks/billing/use-billing';

type StripeConnectProps = {
  connected: boolean;
  stripeAccountId: string;
  isDisabled: boolean; 
};

export const StripeConnect = ({ connected, stripeAccountId, isDisabled }: StripeConnectProps) => {
  const { onStripeConnect, onStripeAccountPending } = useStripe();

  const handleConnect = () => {
    onStripeConnect(stripeAccountId);
  };

  return (
    <Button disabled={connected || isDisabled} onClick={handleConnect}>
      <Loader loading={onStripeAccountPending}>
        {connected ? 'Conectado' : 'Conecte-se à faixa'}
      </Loader>
    </Button>
  );
};
