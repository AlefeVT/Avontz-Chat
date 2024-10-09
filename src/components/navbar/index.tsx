import * as React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Logo } from '../logo'

function NavBar() {
  return (
    <div className="flex flex-col md:flex-row gap-5 justify-between items-center px-7 py-3 font-bold border-b border-solid border-zinc-100 leading-[154.5%] md:px-5">
      <div className="flex gap-1.5 justify-center items-center text-2xl tracking-tighter text-neutral-700">
        <Logo />
      </div>
      <ul className="flex gap-5 justify-center items-center font-bold text-sm leading-5 text-neutral-700 md:flex-row flex-wrap">
        <li className="my-1 md:my-0">Página inicial</li>
        <li className="my-1 md:my-0">Preços</li>
        <li className="my-1 md:my-0">Sala de Notícias</li>
        <li className="my-1 md:my-0">Recursos</li>
        <li className="my-1 md:my-0">Entre em contato conosco</li>
      </ul>
      <Link href="/dashboard">
        <Button className="bg-blue px-6 py-2 rounded-sm text-white">
          Teste Gratuito
        </Button>
      </Link>
    </div>
  )
}

export default NavBar
