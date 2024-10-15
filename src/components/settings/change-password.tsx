'use client';
import { useChangePassword } from '@/hooks/settings/use-settings';
import React from 'react';
import Section from '../section-label';
import FormGenerator from '../forms/form-generator';
import { Button } from '../ui/button';
import { Loader } from '../loader';

type Props = {};

const ChangePassword = (props: Props) => {
  const { register, errors, onChangePassword, loading } = useChangePassword();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section label="Alterar Senha" message="Redefinir sua senha" />
      </div>
      <form onSubmit={onChangePassword} className="lg:col-span-4">
        <div className="lg:w-[500px] flex flex-col gap-3">
          <FormGenerator
            register={register}
            errors={errors}
            name="password"
            placeholder="Nova Senha"
            type="text"
            inputType="input"
          />
          <FormGenerator
            register={register}
            errors={errors}
            name="confirmPassword"
            placeholder="Confirme sua senha"
            type="text"
            inputType="input"
          />
          <Button className="bg-blue text-white font-semibold">
            <Loader loading={loading}>Alterar a senha</Loader>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
