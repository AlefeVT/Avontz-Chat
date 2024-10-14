'use client'

import React from 'react'
import { Loader } from '../loader'
import { Switch } from '../ui/switch'
import useSideBar from '@/context/use-sidebar'

type Props = {}

const BreadCrumb = (props: Props) => {
    const {
        chatRoom,
        expand,
        loading,
        onActivateRealtime,
        onExpand,
        page,
        onSignOut,
        realtime,
    } = useSideBar()
    return (
        <div className="flex flex-col ">
            <div className="flex gap-5 items-center">
                <h2 className="text-3xl font-bold capitalize">{page}</h2>
                {page === 'conversation' && chatRoom && (
                    <Loader
                        loading={loading}
                        className="p-0 inline"
                    >
                        <Switch
                            defaultChecked={realtime}
                            onClick={(e) => onActivateRealtime(e)}
                            className="data-[state=checked]:bg-blue data-[state=unchecked]:bg-lightBluePearl"
                        />
                    </Loader>
                )}
            </div>
            <p className="text-gray-500 text-sm">
                {page == 'settings'
                    ? 'Gerencie as configurações da sua conta, preferências e integrações'
                    : page == 'dashboard'
                        ? 'Uma visão detalhada das suas métricas, uso, clientes e mais'
                        : page == 'appointment'
                            ? 'Veja e edite todos os seus compromissos'
                            : page == 'email-marketing'
                                ? 'Envie e-mails em massa para seus clientes'
                                : page == 'integration'
                                    ? 'Conecte aplicativos de terceiros ao Avonts-Chat'
                                    : 'Modifique as configurações de domínio, altere opções do chatbot, insira perguntas de vendas e treine seu bot para fazer o que você deseja.'}

            </p>
        </div>
    )
}

export default BreadCrumb