import { z } from "zod";

export const StripeConectSchema = z.object({
    stripeAccountId: z
      .string()
      .min(1, 'O ID da Conta do Stripe é obrigatório')
      .regex(/^acct_\w+$/, 'O ID da Conta do Stripe deve ter um formato válido'),
  });