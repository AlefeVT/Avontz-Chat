import { TabsContent } from '@/components/ui/tabs';
import { HELP_DESK_TABS_MENU } from '@/constants/menu';
import React from 'react';
import HelpDesk from './help-desk';
import FilterQuestions from './filter-questions';
import TabsMenu from '@/components/tabs';

type Props = {
  id: string;
};

const BotTrainingForm = ({ id }: Props) => {
  return (
    <div className="py-5 mb-10 flex flex-col gap-5 items-start">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-2xl">Treinamento de bots</h2>
        <p className="text-sm font-light">
          Defina perguntas frequentes, crie perguntas para capturar informações
          de leads e treine seu bot para agir da maneira que você deseja.
        </p>
      </div>
      <TabsMenu triggers={HELP_DESK_TABS_MENU}>
        <TabsContent value="suporte" className="w-full">
          <HelpDesk id={id} />
        </TabsContent>
        <TabsContent value="perguntas">
          <FilterQuestions id={id} />
        </TabsContent>
      </TabsMenu>
    </div>
  );
};

export default BotTrainingForm;
