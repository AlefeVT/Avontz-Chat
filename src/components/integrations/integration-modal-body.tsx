import { CheckCircle2Icon } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { StripeConnect } from '../settings/stripe-connect';

type IntegrationModalBodyProps = {
  type: string;
  connections: {
    [key in 'stripe']: boolean;
  };
};

export const IntegrationModalBody = ({
  type,
  connections,
}: IntegrationModalBodyProps) => {
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
          <div className="flex justify-between mt-10">
            <Button variant="outline">Saber mais</Button>
            <StripeConnect connected={connections[type]} />
          </div>
        </div>
      );
    default:
      return <></>;
  }
};
