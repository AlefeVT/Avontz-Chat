'use client'
import { Loader } from '@/components/loader'
import SubscriptionCard from '@/components/settings/subscription-card'
import { Button } from '@/components/ui/button'
import { useSubscriptions } from '@/hooks/billing/use-billing'
import React from 'react'

type Props = {
  plan: 'Simples' | 'Ultimate' | 'Plus'
}

const SubscriptionForm = ({ plan }: Props) => {
  const { loading, onSetPayment, payment, onUpdatetToFreTier } =
    useSubscriptions(plan)

  return (
    <Loader loading={loading}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <SubscriptionCard
            title="Simples"
            description="Perfect if you’re just getting started with Corinna AI"
            price="0"
            payment={payment}
            onPayment={onSetPayment}
            id="Simples"
          />

          <SubscriptionCard
            title="Ultimate"
            description="Perfect if you’re just getting started with Corinna AI"
            price="15"
            payment={payment}
            onPayment={onSetPayment}
            id="Ultimate"
          />

          <SubscriptionCard
            title="Plus"
            description="Perfect if you’re just getting started with Corinna AI"
            price="35"
            payment={payment}
            onPayment={onSetPayment}
            id="Plus"
          />
        </div>
        <StripeElements payment={payment} />
        {payment === 'Simples' && (
          <Button onClick={onUpdatetToFreTier}>
            <Loader loading={loading}>Confirm</Loader>
          </Button>
        )}
      </div>
    </Loader>
  )
}

export default SubscriptionForm