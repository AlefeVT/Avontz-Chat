import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { USER_REGISTRATION_FORM } from '@/constants/forms';
import FormGenerator from '../form-generator';

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

function AccountDetailsForm({ errors, register }: Props) {
  return (
    <>
      <h2 className="text-slateBlue md:text-4xl font-bold">
        Detalhes da conta
      </h2>
      <p className="text-iridium md:text-sm">Digite seu e-mail e senha</p>
      {USER_REGISTRATION_FORM.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}
    </>
  );
}

export default AccountDetailsForm;
