import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { formatPrice } from '~/util/format';
import api from '~/services/api';
import history from '~/services/history';

import { Container, ContainerHeader, RegisterOptions } from './styles';

// VALIDA FORM
const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrtigatório'),
  duration: Yup.number()
    .typeError('Compo deve ser um valor númerico')
    .integer()
    .required('A duração é obrtigatória'),
  price: Yup.number()
    .typeError('Compo deve ser um valor númerico')
    .required('O preço é obrtigatório'),
});

export default function PlansRegister() {
  const [total, setTotal] = useState(formatPrice(0));
  const [price_, setPrice] = useState(0);
  const [duration_, setDuration] = useState(0);

  // CADASTRA NOVO PLANO
  async function handleSubmit({ title, duration, price }) {
    try {
      await api.post('plans', {
        title,
        duration,
        price,
      });

      history.push('/plan');
      toast.success('Plano cadastrado!');
    } catch (error) {
      toast.error('ERROR AO CADASTRAR PLANO, VERIFIQUE OS DADOS!');
    }
  }

  // PEGA A DURAÇÃO DO PLANO
  function handleDuration(e) {
    const { value } = e.target;
    setDuration(value);
  }

  // PEGA O VALOR DO PLANO
  function handlePrice(e) {
    const { value } = e.target;
    setPrice(value);
  }

  // CALCULA O VALOR TOTAL DO PLANO
  useEffect(() => {
    setTotal(formatPrice(duration_ * price_));
  }, [duration_, price_]);

  return (
    <Container>
      <ContainerHeader>
        <h1>Cadastro de plano</h1>

        <RegisterOptions>
          <NavLink to="/plan">
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
        <label htmlFor="title">TÍTULO DO PLANO</label>
        <Input type="text" name="title" id="title" />

        <div>
          <div>
            <label htmlFor="duration">DURAÇÃO (em meses)</label>
            <Input
              type="number"
              name="duration"
              id="duration"
              onChange={handleDuration}
            />
          </div>

          <div>
            <label htmlFor="price">PREÇO MENSAL</label>
            <Input
              type="number"
              step="any"
              name="price"
              id="price"
              onChange={handlePrice}
            />
          </div>

          <div>
            <label htmlFor="priceTotal">PREÇO TOTAL</label>
            <Input
              type="text"
              name="priceTotal"
              id="priceTotal"
              value={total}
              readOnly
            />
          </div>
        </div>
      </Form>
    </Container>
  );
}
