'use client'
import React from 'react'
import { useHelpDesk } from '@/hooks/settings/use-settings'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import Section from '@/components/section-label'
import FormGenerator from '../form-generator'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/loader'
import Accordion from '@/components/accordian'

type Props = {
  id: string
}

const HelpDesk = ({ id }: Props) => {
  const { register, errors, onSubmitQuestion, isQuestions, loading } =
    useHelpDesk(id)

  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[1px]">
        <CardTitle>Suporte Técnico</CardTitle>
        <form
          onSubmit={onSubmitQuestion}
          className="flex flex-col gap-6 mt-10"
        >
          <div className="flex flex-col gap-3">
            <Section
              label="Pergunta"
              message="Adicione uma pergunta que você acredita ser frequentemente feita."
            />
            <FormGenerator
              inputType="input"
              register={register}
              errors={errors}
              form="help-desk-form"
              name="question"
              placeholder="Digite sua pergunta"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Section
              label="Resposta para a pergunta"
              message="A resposta para a pergunta acima."
            />
            <FormGenerator
              inputType="textarea"
              register={register}
              errors={errors}
              name="answer"
              form="help-desk-form"
              placeholder="Digite sua resposta"
              type="text"
              lines={5}
            />
          </div>
          <Button
            type="submit"
            className="bg-blue hover:bg-blue hover:opacity-70 transition duration-150 ease-in-out text-white font-semibold"
          >
            Criar
          </Button>
        </form>
      </CardContent>
      <CardContent className="p-6 overflow-y-auto chat-window">
        <Loader loading={loading}>
          {isQuestions.length ? (
            isQuestions.map((question) => (
              <Accordion
                key={question.id}
                trigger={question.question}
                content={question.answer}
              />
            ))
          ) : (
            <CardDescription>Sem perguntas para mostrar</CardDescription>
          )}
        </Loader>
      </CardContent>
    </Card>
  )
}

export default HelpDesk
