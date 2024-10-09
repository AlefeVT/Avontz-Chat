import Section from "@/components/section-label"
import UploadButton from "@/components/upload-button"
import { BotIcon } from "@/icons/bot-icon"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import Image from 'next/image'

type Props = {
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
    chatBot: {
        id: string
        icon: string | null
        welcomeMessage: string | null
    } | null
}

const EditChatbotIcon = ({ register, errors, chatBot }: Props) => {
    return (
        <div className="py-5 flex flex-col gap-5 items-start">
            <Section
                label="Ícone do chatbot"
                message="Edite o ícone do chatbot."
            />
            <UploadButton
                label="Editar Imagem"
                register={register}
                errors={errors}
            />
                  {chatBot?.icon ? (
        <div className="rounded-full overflow-hidden">
          <Image
            src={`https://ucarecdn.com/${chatBot.icon}/`}
            alt="bot"
            width={80}
            height={80}
          />
        </div>
      ) : (
        <div className="rounded-full cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-blue/80">
          <BotIcon />
        </div>
      )}
        </div>
    )
}

export default EditChatbotIcon;