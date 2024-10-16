import { Logo } from '@/components/logo';
import NavBar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { pricingCards } from '@/constants/landing-page';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  return (
    <main>
      <NavBar />
      <section>
        <div className="flex items-center justify-center flex-col mt-[80px] gap-4 ">
          <span className="text-blue bg-blue/20 px-4 py-2 rounded-full text-sm">
            Um chatbot assistente com tecnologia de IA
          </span>

          <Logo />
          <p className="text-center max-w-[500px]">
            Seu assistente com tecnologia de IA! Incorpore Avontz-Chat em
            qualquer site com apenas um trecho de código!
          </p>
          <Button className="bg-blue font-bold text-white px-4">
            <Link href={'/dashboard'}>Comece de graça</Link>
          </Button>
          <Image
            src="/images/ilustracao_phone.png"
            width={400}
            height={100}
            alt="Logo"
            className="max-w-lg object-contain"
          />
        </div>
      </section>
      <section className="flex justify-center items-center flex-col gap-4 mt-10">
        <h2 className="text-4xl text-center">
          {' '}
          Escolha o que combina com você
        </h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Nossos planos de preços simples são adaptados para atender às suas
          necessidades. Se
          {'você'} não está pronto para se comprometer, você pode começar
          gratuitamente.
        </p>
      </section>
      <div className="flex  justify-center gap-4 flex-wrap mt-6">
        {pricingCards.map((card) => (
          <Card
            key={card.title}
            className={clsx('w-[300px] flex flex-col justify-between', {
              'border-2 border-primary': card.title === 'Unlimited',
            })}
          >
            <CardHeader>
              <CardTitle className="text-blue">{card.title}</CardTitle>
              <CardDescription>
                {pricingCards.find((c) => c.title === card.title)?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">{card.price}</span>
              <span className="text-muted-foreground">
                <span>/ mês</span>
              </span>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div>
                {card.features.map((feature) => (
                  <div key={feature} className="flex gap-2">
                    <Check />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              <Link
                href={`/dashbord?plan=${card.title}`}
                className="bg-[#98b8dd] border-blue border-2 p-2 w-full text-center font-bold rounded-md"
              >
                Comece
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <section className="flex justify-center items-center flex-col gap-4 mt-28">
        <h2 className="text-4xl text-center">Sala de Notícias</h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Explore nossos insights sobre IA, tecnologia e otimização de seus
          negócios.
        </p>
      </section>
      <section className="md:grid-cols-3 grid-cols-1 grid gap-5 container mt-8"></section>
    </main>
  );
}
