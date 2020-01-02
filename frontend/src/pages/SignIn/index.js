import React from 'react';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/images/logo2x.png';

// VALIDAÇÃO DO FORM
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  // PEGA VALOR DO LOADING NO REDUX
  const loading = useSelector(state => state.auth.loading);

  // FUNÇÃO A SER CHAMADA AO SUBMIT
  function handleSubmit({ email, password }) {
    // ENVIA VALORES PARA O REDUX
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" />

        <label htmlFor="email">SEU E-MAIL</label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="exemplo@email.com"
        />

        <label htmlFor="password">SUA SENHA</label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="*********"
        />

        <button type="submit">
          {loading ? (
            <AiOutlineLoading3Quarters color="#fff" size={20} />
          ) : (
            'Entrar no sistema'
          )}
        </button>
      </Form>
    </>
  );
}
