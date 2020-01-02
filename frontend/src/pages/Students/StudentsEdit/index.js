import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import api from '~/services/api';

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
  weight: Yup.string().required('O peso é obrtigatório'),
  height: Yup.string().required('A altura é obrtigatória'),
});

export default function StudentsEdit({ match }) {
  const [student, setStudent] = useState({});
  const { id } = match.params; // PEGA ID DO ESTUDANTE NA URL

  useEffect(() => {
    // CARREGA DADOS DO ESTUDANTE
    async function handleStudent() {
      try {
        const response = await api.get(`students/${id}`);

        // FORMATA PESO E ALTURA
        const data = {
          ...response.data,
          weight: `${response.data.weight}kg`,
          height: `${response.data.height}m`,
        };

        setStudent(data);
      } catch (error) {
        toast.error('Erro ao carregar informações de estudante');
      }
    }

    handleStudent();
  }, [id]);

  // EDITA ESTUDANTE
  async function handleSubmit({ name, email, age, weight, height }) {
    try {
      // FORMATA VALORES
      const [weightFormatted] = weight.split('k');
      const [heightFormatted] = height.split('m');

      weight = weightFormatted;
      height = heightFormatted;

      await api.put(`students/${id}`, {
        name,
        email,
        age,
        weight,
        height,
      });

      toast.success('Estudante atualizado!');
    } catch (error) {
      toast.error('ERROR AO ATUALIZAR ESTUDANTE, VERIFIQUE OS DADOS!');
    }
  }

  return (
    <Container>
      <ContainerHeader>
        <h1>Edição de aluno</h1>

        <RegisterOptions>
          <NavLink to="/student">
            <MdChevronLeft color="#fff" size={20} />
            VOLTAR
          </NavLink>

          <button type="submit" form="form">
            <MdCheck color="#fff" size={20} />
            SALVAR
          </button>
        </RegisterOptions>
      </ContainerHeader>

      <Form
        initialData={student}
        onSubmit={handleSubmit}
        schema={schema}
        id="form"
      >
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
            <Input type="text" name="weight" id="weight" />
          </div>

          <div>
            <label htmlFor="height">ALTURA</label>
            <Input type="text" name="height" id="height" />
          </div>
        </div>
      </Form>
    </Container>
  );
}

StudentsEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
