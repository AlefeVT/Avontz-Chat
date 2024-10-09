import { onGetSubscriptionPlan } from '@/actions/settings'
import InfoBar from '@/components/infobar'
import React from 'react'
import Section from '../section-label'

type Props = {}

const billingSettings = async (props: Props) => {

    const plan = await onGetSubscriptionPlan();

    return (
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-10'>
            <div className="lg:col-span-1">
                <Section 
                    label="configurações de plano"
                    message="Adicione as informações de pagamento e modifique seu plano." />
            </div>            
        </div>
    )
}

export default billingSettings