import React from 'react'
import { Logo, LogoMini, LogoSidebar } from '../logo'

export const PortalBanner = () => {
  return (
    <div className="w-full bg-muted flex justify-center py-5">
      <LogoSidebar size={22} />
    </div>
  )
}