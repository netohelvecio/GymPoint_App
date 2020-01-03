import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { addMonths, format, addDays } from 'date-fns';

import { formatPrice } from '~/util/format';
import api from '~/services/api';
import history from '~/services/history';
import AsyncSelect from '~/components/AsyncSelect';

import {
  Container,
  ContainerHeader,
  RegisterOptions,
  SecondPartForm,
} from './styles';

// VALIDA FORM
const schema = Yup.object().shape({
  studentId: Yup.string().required('O aluno é obrigatório'),
  planId: Yup.string().required('O plano é obrigatório'),
  start_date: Yup.date()
    .typeError('Campo deve ser uma data')
    .required('A data é obrigatória'),
});

export default function MatriculationsRegister() {
  const [plan, setPlan] = useState([]);
  const [name, setName] = useState('');
  const [planSelect, setPlanSelect] = useState();
  const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();
  const [priceTotal, setPriceTotal] = useState(0);

  useEffect(() => {
    // LISTA PLANOS
    async function handlePlan() {
      try {
        const response = await api.get('plans');

        setPlan(response.data);
      } catch (error) {
        toast.error('Erro ao listar planos');
      }
    }

    handlePlan();
  }, [name]);

  const studentPromise = value =>
    api
      .get('/students', {
        params: {
          name: value,
        },
      })
      .then(({ data }) => data)
      .catch(() => []);

  // PEGA O PLANO SELECIONADA E CALCULA VALOR FINAL
  function getPlanValue(e) {
    const planId = Number(e.target.value);
    const plan_selected = plan.find(x => x.id === planId);
    setPlanSelect(plan_selected);
    setPriceTotal(formatPrice(plan_selected.duration * plan_selected.price));
  }

  // PEGA A DATA INICIAL
  function getDateStartValue(e) {
    const { value } = e.target;

    setStartDate(value);
  }

  // CALCULA A DATA FINAL DA MATRICULA E FORMATA A DATA
  useEffect(() => {
    if (planSelect && startDate) {
      const endDateFormatted = format(
        addMonths(addDays(new Date(startDate), 1), planSelect.duration),
        "dd'/'MM'/'yyyy"
      );

      setEndDate(endDateFormatted);
    }
  }, [planSelect, startDate]);

  // REALIZA MATRICULA
  async function handleSubmit({ studentId, planId, start_date }) {
    try {
      await api.post('matriculations', {
        student_id: studentId,
        plan_id: planId,
        start_date,
      });

      history.push('/matriculation');
      toast.success('Matrícula realiazada!');
    } catch (error) {
      toast.error('ERROR AO CADASTRAR MATRÍCULA, VERIFIQUE OS DADOS!');
    }
  }

  return (
    <Container>
      <ContainerHeader>
        <h1>Cadastro de matrícula</h1>

        <RegisterOptions>
          <NavLink to="/matriculation">
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
        <AsyncSelect
          name="studentId"
          label="ALUNO"
          loadOptions={studentPromise}
          placeholder="Selecione o aluno"
          value={name}
          onChange={value => setName(value)}
        />

        <SecondPartForm>
          <div>
            <label htmlFor="plan">PLANO</label>
            <Select
              name="planId"
              id="plan"
              options={plan}
              placeholder="Selecione o plano"
              onChange={getPlanValue}
            />
          </div>

          <div>
            <label htmlFor="startDate">DATA DE INÍCIO</label>
            <Input
              type="date"
              name="start_date"
              id="startDate"
              onChange={getDateStartValue}
            />
          </div>

          <div>
            <label htmlFor="endDate">DATA DE TÉRMINO</label>
            <Input
              type="text"
              name="endDate"
              id="endDate"
              value={endDate}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="priceTotal">VALOR FINAL</label>
            <Input
              type="text"
              name="priceTotal"
              id="priceTotal"
              value={priceTotal}
              readOnly
            />
          </div>
        </SecondPartForm>
      </Form>
    </Container>
  );
}
