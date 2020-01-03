import React from 'react';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container, ContainerHeader, RegisterOptions } from './styles';

// VALIDA FORM
const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrtigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .typeError('Compo deve ser um valor númerico')
    .integer()
    .required('A idade é obrtigatória'),
  weight: Yup.number()
    .typeError('Compo deve ser um valor númerico')
    .required('O peso é obrtigatório'),
  height: Yup.number()
    .typeError('Compo deve ser um valor númerico')
    .required('A altura é obrtigatória'),
});

export default function StudentsRegister() {
  // REGISTRA NOVO ESTUDANTE
  async function handleSubmit({ name, email, age, weight, height }) {
    try {
      await api.post('students', {
        name,
        email,
        age,
        weight,
        height,
      });

      history.push('/student');
      toast.success('Estudante cadastrado!');
    } catch (error) {
      toast.error('ERROR AO CADASTRAR ESTUDANTE, VERIFIQUE OS DADOS!');
    }
  }

  return (
    <Container>
      <ContainerHeader>
        <h1>Cadastro de aluno</h1>

        <RegisterOptions>
          <NavLink to="/student">
            <MdChevronLeft color="#fff" size={20} />
            VOLTAR
          </NavLink>

          <button type="submit" form="form">
            <MdCheck color="#fff" size={20} />
            CADASTRAR
          </button>
        </RegisterOptions>
      </ContainerHeader>

      <Form schema={schema} onSubmit={handleSubmit} id="form">
        <label htmlFor="name">NOME COMPLETO</label>
        <Input type="text" name="name" id="name" placeholder="Helvécio Neto" />

        <label htmlFor="email">ENDEREÇO DE EMAIL</label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="exemplo@email.com"
        />

        <div>
          <div>
            <label htmlFor="age">IDADE</label>
            <Input type="number" name="age" id="age" />
          </div>

          <div>
            <label htmlFor="weight">PESO (em kg)</label>
            <Input type="number" name="weight" step="any" id="weight" />
          </div>

          <div>
            <label htmlFor="height">ALTURA</label>
            <Input type="number" name="height" step="any" id="height" />
          </div>
        </div>
      </Form>
    </Container>
  );
}
