import { getUserAppointments } from '@/actions/appointment';
import {
  getUserBalance,
  getUserClients,
  getUserPlanInfo,
  getUserTotalProductPrices,
  getUserTransactions,
} from '@/actions/dashboard';
import DashboardCard from '@/components/dashboard/cards';
import { PlanUsage } from '@/components/dashboard/plan-usage';
import RecentTransactions from '@/components/dashboard/recentTransactions';
import InfoBar from '@/components/infobar';
import CalIcon from '@/icons/cal-icon';
import PersonIcon from '@/icons/person-icon';
import { DollarSign } from 'lucide-react';
import React from 'react';

type Props = {};

const Page = async (props: Props) => {
  const clients = await getUserClients();
  const sales = await getUserBalance();
  const bookings = await getUserAppointments();
  const plan = await getUserPlanInfo();
  const transactions = await getUserTransactions();
  const products = await getUserTotalProductPrices();

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
        <div className="flex gap-5 flex-wrap">
          <DashboardCard
            value={clients || 0}
            title="Clientes Potenciais"
            icon={<PersonIcon />}
          />
          <DashboardCard
            value={products! * clients! || 0}
            sales
            title="Valor do pipeline (possiveis ganhos)"
            icon={<DollarSign />}
          />
          <DashboardCard
            value={bookings || 0}
            title="Compromissos"
            icon={<CalIcon />}
          />
          <DashboardCard
            value={sales || 0}
            sales
            title="Vendas totais"
            icon={<DollarSign />}
          />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 py-10">
          <div>
            <div>
              <h2 className="font-bold text-2xl">Uso do plano</h2>
              <p className="text-sm font-light">
                Uma visão geral detalhada de suas métricas, uso, clientes e
                muito mais
              </p>
            </div>
            <PlanUsage
              plan={plan?.plan!}
              credits={plan?.credits || 0}
              domains={plan?.domains || 0}
              clients={clients || 0}
            />
          </div>
          {/* Utilizando o componente RecentTransactions */}
          {transactions && transactions.data && (
            <RecentTransactions transactions={transactions.data} />
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
