import { client } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: '2024-09-30.acacia',
})

export async function GET() {
  try {
    const user = await currentUser()
    if (!user) return new NextResponse('Usuário não autenticado')

        const account = await stripe.accounts.create({
            country: 'BR',
            type: 'custom',
            business_type: 'company',
            capabilities: {
              card_payments: {
                requested: true,
              },
              transfers: {
                requested: true,
              },
            },
            default_currency: 'brl',
            external_account: {
              object: 'bank_account',
              country: 'BR',
              currency: 'brl',
              account_number: '0001234', // Número de conta de teste para repasse bem-sucedido
              routing_number: '110-0000', // Routing number de teste válido para o Brasil
            },
            tos_acceptance: {
              date: Math.floor(Date.now() / 1000),
              ip: '172.18.80.19',
            },
          });               
          

    if (account) {
      const approve = await stripe.accounts.update(account.id, {
        business_profile: {
          mcc: '5045',
          url: 'https://bestcookieco.com',
        },
        company: {
            address: {
              city: 'São Paulo',
              line1: 'Avenida Paulista, 1000',
              postal_code: '01001000', // Utilize um CEP no formato correto (apenas números)
              state: 'SP', // Use a sigla do estado corretamente
            },
            tax_id: '000000000',
            name: 'The Best Cookie Co',
            phone: '8888675309',
          },
      })
      if (approve) {
        const person = await stripe.accounts.createPerson(account.id, {
          first_name: 'Jenny',
          last_name: 'Rosen',
          relationship: {
            representative: true,
            title: 'CEO',
          },
        })
        if (person) {
          const approvePerson = await stripe.accounts.updatePerson(
            account.id,
            person.id,
            {
              address: {
                city: 'victoria ',
                line1: '123 State St',
                postal_code: 'V8P 1A1',
                state: 'BC',
              },
              dob: {
                day: 10,
                month: 11,
                year: 1980,
              },
              ssn_last_4: '0000',
              phone: '8888675309',
              email: 'jenny@bestcookieco.com',
              relationship: {
                executive: true,
              },
            }
          )
          if (approvePerson) {
            const owner = await stripe.accounts.createPerson(account.id, {
              first_name: 'Kathleen',
              last_name: 'Banks',
              email: 'kathleen@bestcookieco.com',
              address: {
                city: 'victoria ',
                line1: '123 State St',
                postal_code: 'V8P 1A1',
                state: 'BC',
              },
              dob: {
                day: 10,
                month: 11,
                year: 1980,
              },
              phone: '8888675309',
              relationship: {
                owner: true,
                percent_ownership: 80,
              },
            })
            if (owner) {
              const complete = await stripe.accounts.update(account.id, {
                company: {
                  owners_provided: true,
                },
              })
              if (complete) {
                const saveAccountId = await client.user.update({
                  where: {
                    clerkId: user.id,
                  },
                  data: {
                    stripeId: account.id,
                  },
                })

                if (saveAccountId) {
                  const accountLink = await stripe.accountLinks.create({
                    account: account.id,
                    refresh_url:
                      'http://localhost:3000/callback/stripe/refresh',
                    return_url: 'http://localhost:3000/callback/stripe/success',
                    type: 'account_onboarding',
                    collection_options: {
                      fields: 'currently_due',
                    },
                  })

                  return NextResponse.json({
                    url: accountLink.url,
                  })
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(
      'Ocorreu um erro ao chamar a API Stripe para criar uma conta:',
      error
    )
  }
}