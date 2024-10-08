import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import UserTypeCard from './user-type-card'

type Props = {
  register: UseFormRegister<FieldValues>
  userType: 'owner' | 'student'
  setUserType: React.Dispatch<React.SetStateAction<'owner' | 'student'>>
}

const TypeSelectionForm = ({ register, setUserType, userType }: Props) => {
  return (
    <>
      <h2 className="text-slateBlue md:text-4xl font-bold">Crie uma conta</h2>
      <p className="text-iridium md:text-sm">
      Conte-nos sobre você! O que você faz? Vamos personalizar o seu
      <br /> experiência que melhor lhe convier.
      </p>
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="owner"
        title="Eu possuo um negócio"
        text="Configurando minha conta para minha empresa."
      />
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        userType={userType}
        value="student"
        title="Eu sou um estudante"
        text="Procurando aprender sobre a ferramenta."
      />
    </>
  )
}

export default TypeSelectionForm