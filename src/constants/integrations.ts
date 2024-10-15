type IntegrationsListItemProps = {
  id: string;
  name: 'stripe';
  logo: string;
  description: string;
  title: string;
  modalDescription: string;
};

export const INTEGRATION_LIST_ITEMS: IntegrationsListItemProps[] = [
  {
    id: '1',
    name: 'stripe',
    description:
      'Stripe é a maneira mais rápida e fácil de integrar pagamentos e serviços financeiros à sua plataforma de software ou mercado.',
    logo: 'a88633a7-e65e-4093-a49d-889eed01aa17',
    title: 'Conectar conta Stripe',
    modalDescription:
      'As plataformas e mercados de maior sucesso do mundo, incluindo Shopify e DoorDash, usam Stripe Connect.',
  },
];
