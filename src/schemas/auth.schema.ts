import { ZodType, z } from 'zod'

export type UserRegistrationProps = {
  type: string
  fullname: string
  email: string
  confirmEmail: string
  password: string
  confirmPassword: string
  otp: string
}

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z
  .object({
    type: z.string().min(1),
    fullname: z
      .string()
      .min(4, { message: 'seu nome completo deve ter pelo menos 4 caracteres' }),
    email: z.string().email({ message: 'Formato de e-mail incorreto' }),
    confirmEmail: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Sua senha deve ter pelo menos 8 caracteres' })
      .max(64, {
        message: 'Sua senha não pode ter mais de 64 caracteres',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'a senha deve conter apenas letras e números'
      ),
    confirmPassword: z.string(),
    otp: z.string().min(6, { message: 'Você deve inserir um código de 6 dígitos' }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'as senhas não correspondem',
    path: ['confirmPassword'],
  })
  .refine((schema) => schema.email === schema.confirmEmail, {
    message: 'Seus e-mails não correspondem',
    path: ['confirmEmail'],
  })

export type UserLoginProps = {
  email: string
  password: string
}

export type ChangePasswordProps = {
  password: string
  confirmPassword: string
}

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: z.string().email({ message: 'Você não inseriu um e-mail válido' }),
  password: z
    .string()
    .min(8, { message: 'Sua senha deve ter pelo menos 8 caracteres' })
    .max(64, {
      message: 'Sua senha não pode ter mais de 64 caracteres',
    }),
})

export const ChangePasswordSchema: ZodType<ChangePasswordProps> = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Sua senha deve ter pelo menos 8 caracteres' })
      .max(64, {
        message: 'Sua senha não pode ter mais de 64 caracteres',
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
        'a senha deve conter apenas letras e números'
      ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'as senhas não correspondem',
    path: ['confirmPassword'],
  })
