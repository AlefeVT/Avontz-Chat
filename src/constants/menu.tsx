import CalIcon from '@/icons/cal-icon';
import ChatIcon from '@/icons/chat-icon';
import DashboardIcon from '@/icons/dashboard-icon';
import EmailIcon from '@/icons/email-icon';
import HelpDeskIcon from '@/icons/help-desk-icon';
import IntegrationsIcon from '@/icons/integrations-icon';
import SettingsIcon from '@/icons/settings-icon';
import StarIcon from '@/icons/star-icon';
import TimerIcon from '@/icons/timer-icon';

type SIDE_BAR_MENU_PROPS = {
  label: string;
  icon: JSX.Element;
  path: string;
};

export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
  {
    label: 'Painel',
    icon: <DashboardIcon />,
    path: 'dashboard',
  },
  {
    label: 'Conversas',
    icon: <ChatIcon />,
    path: 'conversation',
  },
  {
    label: 'Integrações',
    icon: <IntegrationsIcon />,
    path: 'integration',
  },
  {
    label: 'Configurações',
    icon: <SettingsIcon />,
    path: 'settings',
  },
  {
    label: 'Compromissos',
    icon: <CalIcon />,
    path: 'appointment',
  },
  {
    label: 'Email Marketing',
    icon: <EmailIcon />,
    path: 'email-marketing',
  },
];

type TABS_MENU_PROPS = {
  label: string;
  icon?: JSX.Element;
};

export const TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'não lidos',
    icon: <EmailIcon />,
  },
  {
    label: 'todos',
    icon: <EmailIcon />,
  },
  {
    label: 'expirados',
    icon: <TimerIcon />,
  },
  {
    label: 'favoritos',
    icon: <StarIcon />,
  },
];

export const HELP_DESK_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'suporte',
  },
  {
    label: 'perguntas',
  },
];

export const APPOINTMENT_TABLE_HEADER = [
  'Nome',
  'Hora Solicitada',
  'Hora Adicionada',
  'Domínio',
];

export const EMAIL_MARKETING_HEADER = ['Id', 'Email', 'Respostas', 'Domínio'];

export const BOT_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'chat',
    icon: <ChatIcon />,
  },
  {
    label: 'suporte',
    icon: <HelpDeskIcon />,
  },
];
