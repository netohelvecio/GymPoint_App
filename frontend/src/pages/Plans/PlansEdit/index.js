import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { formatPrice } from '~/util/format';
import api from '~/services/api';

import { Container, ContainerHeader, RegisterOptions } from './styles';

// VALIDA FORM
const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrtigatório'),
  duration: Yup.number()
    .typeError('Compo deve ser um valor númerico')
    .integer()
    .required('A duração é obrtigatória'),
  priceFormatted: Yup.string().required('O preço é obrtigatório'),
});

export default function PlansEdit({ match }) {
  const { id } = match.params; // PEGA ID DO PLANO NA URL

  const [plan, setPlan] = useState({});
  const [total, setTotal] = useState(formatPrice(0));
  const [price_, setPrice] = useState(0);
  const [duration_, setDuration] = useState(0);

  useEffect(() => {
    // CARREGA INFORMAÇÕES DO PLANO
    async function handlePlan() {
      try {
        const response = await api.get(`plans/${id}`);

        const data = {
          ...response.data,
          priceFormatted: formatPrice(response.data.price),
          priceTotal: formatPrice(response.data.price * response.data.duration),
        };

        // SETA VALORES DE PREÇO - DURAÇÃO - VALOR TOTAL
        setPrice(data.price);
        setDuration(data.duration);
        setTotal(data.priceTotal);
        setPlan(data);
      } catch (error) {
        toast.error('Erro ao carregar informações do plano');
      }
    }

    handlePlan();
  }, [id]);

  // EDITA PLANO
  async function handleSubmit({ title, duration, priceFormatted }) {
    let price;

    // RETIRA CIFRÃO
    if (priceFormatted.includes('$')) {
      [, price] = priceFormatted.split('$');
    } else {
      price = priceFormatted;
    }

    try {
      await api.put(`plans/${id}`, {
        title,
        duration,
        price: parseInt(price, 10),
      });
      toast.success('Plano editado!');
    } catch (error) {
      toast.error('ERROR AO EDITAR PLANO, VERIFIQUE OS DADOS!');
    }
  }

  // PEGA O VALOR DA DURAÇÃO
  function handleDuration(e) {
    const { value } = e.target;
    setDuration(value);
  }

  // PEGA O VALOR DO PREÇO
  function handlePrice(e) {
    if (e.target.value.includes('$')) {
      const [, value] = e.target.value.split('$');
      setPrice(parseInt(value, 10));
    } else {
      const { value } = e.target;
      setPrice(parseInt(value, 10));
    }
  }

  // CALCULA O VALOR TOTAL
  useEffect(() => {
    setTotal(formatPrice(duration_ * price_));
  }, [duration_, price_]);

  return (
    <Container>
      <ContainerHeader>
        <h1>Edição de plano</h1>

        <RegisterOptions>
          <NavLink to="/plan">
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
        schema={schema}
        onSubmit={handleSubmit}
        initialData={plan}
        id="form"
      >
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
              type="text"
              name="priceFormatted"
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

PlansEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
