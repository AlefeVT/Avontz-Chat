import Image from 'next/image'
import * as React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import {Logo} from '../logo'

function NavBar() {
  return (
    <div className="flex gap-5 justify-between items-center px-7 py-1 font-bold border-b border-solid border-zinc-100 leading-[154.5%] max-md:flex-wrap max-md:px-5">
      <div className="flex gap-1.5 justify-center self-stretch my-auto text-2xl tracking-tighter text-neutral-700">
      <Logo />
      </div>
      <ul className="gap-5 justify-between self-stretch font-bold my-auto text-sm leading-5 text-neutral-700 max-md:flex-wrap max-md:max-w-full hidden md:flex">
        <li>Página inicial</li>
        <li>Preços</li>
        <li>Sala de Notícias</li>
        <li>Recursos</li>
        <li>Entre em contato conosco</li>
      </ul>
      <Link
        href="/dashboard"
        className="bg-blue px-8 py-2 rounded-sm text-white"
      >
        Teste Gratuito
      </Link>
    </div>
  )
}

export default NavBar