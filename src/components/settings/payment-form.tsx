'use client'
import React from 'react'
import { CardDescription } from '../ui/card'
import { Loader } from '../loader'
import { PaymentElement } from '@stripe/react-stripe-js'
import { Button } from '../ui/button'
import { useCompletePayment } from '@/hooks/billing/use-billing'


type PaymentFormProps = {
  plan: 'Simples' | 'Ultimate' | 'Plus'
}

export const PaymentForm = ({ plan }: PaymentFormProps) => {
  const { processing, onMakePayment } = useCompletePayment(plan)
  return (
    <form
      onSubmit={onMakePayment}
      className="flex flex-col gap-5"
    >
      <div>
        <h2 className="font-semibold text-xl text-black">Método de pagamento</h2>
        <CardDescription>Insira os dados do seu cartão</CardDescription>
      </div>
      <PaymentElement />
      <Button type="submit">
        <Loader loading={processing}>Assinar</Loader>
      </Button>
    </form>
  )
}