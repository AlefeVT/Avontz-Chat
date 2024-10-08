
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'


type Props = {
    children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
    const user = await currentUser()

    if (user) redirect('/')

    return (
        <div className="h-screen flex w-full justify-center">
            <div className="w-[600px] ld:w-full flex flex-col items-start p-6">
                <div>
                    <h2 className="flex items-center space-x-2 p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-blue"
                        >
                            <path d="M12 6V2H8" /><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
                            <path d="M2 12h2" /><path d="M9 11v2" /><path d="M15 11v2" /><path d="M20 12h2" />
                        </svg>
                        <span className="text-gray-900 font-extrabold text-xl">Avontz</span>
                        <span className="text-blue opacity-70">|</span>
                        <span className="text-blue font-extrabold text-xl">Chat</span>
                    </h2>
                </div>

                {children}
            </div>
            <div className="hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative bg-cream  flex-col pt-10 pl-24 gap-3">
                <h2 className="text-slateBlue md:text-4xl font-bold">
                    Olá, sou sua assistente com tecnologia de IA, Avontz-Chat!
                </h2>
                <p className="text-iridium md:text-sm mb-10">
                    Sou capaz de capturar informações de leads sem um formulário...{' '}
                    <br />
                    algo nunca feito antes 😉
                </p>
                <Image
                    src="/images/app-ui.png"
                    alt="app image"
                    loading="lazy"
                    sizes="30"
                    className="absolute rounded-md shrink-0 !w-[1600px] top-48"
                    width={0}
                    height={0}
                />
            </div>
        </div>
    )
}

export default Layout