"use client"

import { onGetSubscriptionPlan } from '@/actions/settings'
import React, { useEffect, useState } from 'react'
import Section from '../section-label'
import { Card, CardContent, CardDescription } from '../ui/card'
import { CheckCircle2, Plus } from 'lucide-react'
import { pricingCards } from '@/constants/landing-page'

type Props = {}

const BillingSettings = (props: Props) => {
    const [plan, setPlan] = useState<string | null>(null)
    const [planFeatures, setPlanFeatures] = useState<string[] | null>(null)
  
    useEffect(() => {
      const fetchSubscriptionPlan = async () => {
        try {
          const plan = await onGetSubscriptionPlan()
          
          if (plan) {
            setPlan(plan)
            const features = pricingCards.find(
              (card) => {
                return card.title.toUpperCase() === plan.toUpperCase()
              }
            )?.features
            setPlanFeatures(features || null)
          } else {
            console.log("No plan found.")
          }
        } catch (error) {
          console.error("Error fetching plan features:", error)
        }
      }
  
      fetchSubscriptionPlan()
    }, [])
  
    if (!planFeatures) return null

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-1">
                <Section
                    label="Configurações do plano"
                    message="Adicione informações de pagamento, atualize e modifique seu plano."
                />
            </div>
            <div className="lg:col-span-2 flex justify-start lg:justify-center">
                <Card className="border-dashed bg-cream border-gray-400 w-full cursor-pointer h-[270px] flex justify-center items-center">
                    <CardContent className="flex gap-2 items-center">
                        <div className="rounded-full border-2 p-1">
                            <Plus className="text-gray-400" />
                        </div>
                        <CardDescription className="font-semibold">
                        Plano de atualização
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold mb-2">Plano Atual</h3>
              <p className="text-sm font-semibold">{plan}</p>
              <div className="flex gap-2 flex-col mt-2">
                {planFeatures.map((feature) => (
                  <div key={feature} className="flex gap-2">
                    <CheckCircle2 className="text-muted-foreground" />
                    <p className="text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
        </div>
    )
}

export default BillingSettings
