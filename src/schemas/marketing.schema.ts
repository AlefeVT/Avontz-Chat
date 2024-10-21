import { ZodType, z } from 'zod';

type EmailMarketingProps = {
  name: string;
};

type EmailMarketingBodyProps = {
  description: string;
};

export const EmailMarketingSchema: ZodType<EmailMarketingProps> = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome da campanha deve ter pelo menos 3 caracteres' }),
});

export const EmailMarketingBodySchema: ZodType<EmailMarketingBodyProps> =
  z.object({
    description: z
      .string()
      .min(30, { message: 'O corpo deve ter pelo menos 30 caracteres' }),
  });
