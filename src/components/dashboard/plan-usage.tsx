import React from 'react';
import { ProgressBar } from '../progress';

type PlanUsageProps = {
  plan: 'Simples' | 'Ultimate' | 'Plus';
  credits: number;
  domains: number;
  clients: number;
};

export const PlanUsage = ({
  plan,
  credits,
  domains,
  clients,
}: PlanUsageProps) => {
  console.log(credits);
  return (
    <div className="flex flex-col gap-5 py-5">
      <ProgressBar
        end={plan == 'Simples' ? 10 : plan == 'Ultimate' ? 50 : 500}
        label="Créditos de e-mail"
        credits={credits}
      />
      <ProgressBar
        end={plan == 'Simples' ? 1 : plan == 'Ultimate' ? 2 : 100}
        label="Domínios"
        credits={domains}
      />
      <ProgressBar
        end={plan == 'Simples' ? 10 : plan == 'Ultimate' ? 50 : 500}
        label="Contatos"
        credits={clients}
      />
    </div>
  );
};
