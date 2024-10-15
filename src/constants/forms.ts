type UserRegistrationProps = {
  id: string;
  type: 'email' | 'text' | 'password';
  inputType: 'select' | 'input';
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  name: string;
};

export const USER_REGISTRATION_FORM: UserRegistrationProps[] = [
  {
    id: '1',
    inputType: 'input',
    placeholder: 'Nome completo',
    name: 'fullname',
    type: 'text',
  },
  {
    id: '2',
    inputType: 'input',
    placeholder: 'Email',
    name: 'email',
    type: 'email',
  },
  {
    id: '3',
    inputType: 'input',
    placeholder: 'Confirmar e-mail',
    name: 'confirmEmail',
    type: 'email',
  },
  {
    id: '4',
    inputType: 'input',
    placeholder: 'Senha',
    name: 'password',
    type: 'password',
  },
  {
    id: '5',
    inputType: 'input',
    placeholder: 'Confirmar senha',
    name: 'confirmPassword',
    type: 'password',
  },
];

export const USER_LOGIN_FORM: UserRegistrationProps[] = [
  {
    id: '1',
    inputType: 'input',
    placeholder: 'Digite seu e-mail',
    name: 'email',
    type: 'email',
  },
  {
    id: '2',
    inputType: 'input',
    placeholder: 'Senha',
    name: 'password',
    type: 'password',
  },
];
