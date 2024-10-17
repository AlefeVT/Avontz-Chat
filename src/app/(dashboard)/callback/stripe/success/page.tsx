
import InfoBar from '@/components/infobar'
import React from 'react'

type Props = {}

const Page = async (props: Props) => {

  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
       Conta Conectada com sucesso!
      </div>
    </>
  )
}

export default Page