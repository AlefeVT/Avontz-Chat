'use client'
import React, { useEffect } from 'react'

import { Button } from '../ui/button'
import { Loader } from '../loader'
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import { useEditEmail } from '@/hooks/email-marketing/use-marketing'
import FormGenerator from '../forms/form-generator'

type EditEmailProps = {
  id: string
  onCreate(): void
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  setDefault: UseFormSetValue<FieldValues>
}

export const EditEmail = ({
  id,
  onCreate,
  errors,
  register,
  setDefault,
}: EditEmailProps) => {
  const { loading, template } = useEditEmail(id)

  useEffect(() => {
    if (template) {
      setDefault('description', JSON.parse(template))
    }
  }, [template, setDefault])

  return (
    <form onSubmit={onCreate} className="flex flex-col gap-3">
      <Loader loading={loading}>
        <FormGenerator
          name="description"
          label="Mensagem"
          register={register}
          errors={errors}
          inputType="textarea"
          lines={10}
          placeholder="descrição do seu e-mail"
          type="text"
          defaultValue={template ? JSON.parse(template) : ''} // Adicione o defaultValue aqui
        />
        <Button>Salvar</Button>
      </Loader>
    </form>
  )
}
