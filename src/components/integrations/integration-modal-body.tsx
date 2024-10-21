'use client';

import { CheckCircle2Icon } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { StripeConnect } from '../settings/stripe-connect';
import FormGenerator from '../forms/form-generator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StripeConectSchema } from '@/schemas/stripe.schema';
import { useStripe } from '@/hooks/billing/use-billing';

type IntegrationModalBodyProps = {
  type: string;
  connections: {
    [key in 'stripe']: boolean;
  };
};

type FormData = {
  stripeAccountId: string;
};

export const IntegrationModalBody = ({
  type,
  connections,
}: IntegrationModalBodyProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(StripeConectSchema),
    mode: 'onChange',
  });
  const stripeAccountIdValue = watch('stripeAccountId', '');
  const { onStripeConnect } = useStripe();

  const onSubmit = (data: FormData) => {
    onStripeConnect(data.stripeAccountId);
  };

  switch (type) {
    case 'stripe':
      return (
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Stripe gostaria de acessar</h2>
          {[
            'Pagamento e informações bancárias',
            'Produtos e serviços que você vende',
            'Informações comerciais e fiscais',
            'Criar e atualizar produtos',
          ].map((item, key) => (
            <div key={key} className="flex gap-2 items-center pl-3">
              <CheckCircle2Icon />
              <p>{item}</p>
            </div>
          ))}

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGenerator
              type="text"
              inputType="input"
              placeholder="ID da Conta do Stripe"
              register={register}
              name="stripeAccountId"
              errors={errors}
            />

            <div className="flex justify-between mt-10">
              <Button variant="outline">Saber mais</Button>
              <StripeConnect
                connected={connections[type]}
                stripeAccountId={stripeAccountIdValue}
                isDisabled={!isValid}
              />
            </div>
          </form>
        </div>
      );
    default:
      return <></>;
  }
};
