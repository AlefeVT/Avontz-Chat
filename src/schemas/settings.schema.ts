import { z } from 'zod';

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB
export const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

export type DomainSettingsProps = {
  domain?: string;
  image?: any;
  welcomeMessage?: string;
};

export type HelpDeskQuestionsProps = {
  question: string;
  answer: string;
};

export type AddProductProps = {
  name: string;
  image: any;
  price: string;
};

export type FilterQuestionsProps = {
  question: string;
};

export const AddDomainSchema = z.object({
  domain: z
    .string()
    .min(4, { message: 'O domínio deve ter pelo menos 3 caracteres' })
    .refine(
      (value) =>
        /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ''),
      'Este não é um domínio válido'
    ),
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: 'O tamanho do arquivo deve ser menor que 2MB',
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
      message: 'Apenas os formatos JPG, JPEG e PNG são aceitos',
    }),
});

export const DomainSettingsSchema = z
  .object({
    domain: z
      .string()
      .min(4, { message: 'O domínio deve ter pelo menos 3 caracteres' })
      .refine(
        (value) =>
          /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ''),
        'Este não é um domínio válido'
      )
      .optional()
      .or(z.literal('').transform(() => undefined)),
    image: z.any().optional(),
    welcomeMessage: z
      .string()
      .min(6, 'A mensagem deve ter pelo menos 6 caracteres')
      .optional()
      .or(z.literal('').transform(() => undefined)),
  })
  .refine(
    (schema) => {
      if (schema.image?.length) {
        if (
          ACCEPTED_FILE_TYPES.includes(schema.image?.[0].type!) &&
          schema.image?.[0].size <= MAX_UPLOAD_SIZE
        ) {
          return true;
        }
      }
      if (!schema.image?.length) {
        return true;
      }
    },
    {
      message:
        'O arquivo deve ter menos de 2MB, e apenas arquivos PNG, JPEG e JPG são aceitos',
      path: ['image'],
    }
  );

export const HelpDeskQuestionsSchema = z.object({
  question: z.string().min(1, { message: 'A pergunta não pode estar vazia' }),
  answer: z.string().min(1, { message: 'A resposta não pode estar vazia' }),
});

export const FilterQuestionsSchema = z.object({
  question: z.string().min(1, { message: 'A pergunta não pode estar vazia' }),
});

export const AddProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: 'O tamanho do arquivo deve ser menor que 2MB',
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
      message: 'Apenas os formatos JPG, JPEG e PNG são aceitos',
    }),
  price: z.string(),
});
