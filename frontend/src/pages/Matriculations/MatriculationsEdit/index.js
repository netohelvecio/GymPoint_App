import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { addMonths, format, addDays, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import { formatPrice } from '~/util/format';
import api from '~/services/api';

import { Container, ContainerHeader, RegisterOptions } from './styles';
import ContainerLoading from '~/components/Loading';

// VALIDAÇÃO DE FORM
const schema = Yup.object().shape({
  planId: Yup.string().required('O plano é obrigatório'),
  start_date: Yup.date()
    .typeError('Campo deve ser uma data')
    .required('A data é obrigatória'),
});

export default function MatriculationsEdit({ match }) {
  const { id } = match.params; // PEGA O ID DO PLANO NA URL

  const [plan, setPlan] = useState([]);
  const [matriculation, setMatriculation] = useState({});
  const [planSelect, setPlanSelect] = useState();
  const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();
  const [priceTotal, setPriceTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // LISTA PLANOS EXISTENTES
    async function handlePlan() {
      try {
        const response = await api.get('plans');

        setPlan(response.data);
      } catch (error) {
        toast.error('Erro ao listar planos');
      }
    }

    handlePlan();
  }, []);

  useEffect(() => {
    // PEGA INFORMAÇÃO DA MATRICULA
    async function handleStudent() {
      try {
        setLoading(true);

        const response = await api.get(`matriculations/${id}`);

        // FORMATA DATA INICIAL E FINAL
        const startDateFormatted = format(
          parseISO(response.data.start_date),
          "yyyy'-'MM'-'dd"
        );

        const endDateDateFormatted = format(
          parseISO(response.data.end_date),
          "dd'/'MM'/'yyyy"
        );

        const data = {
          ...response.data,
          planId: response.data.plan.id,
          studentId: response.data.student.name,
          start_date: startDateFormatted,
          endDate: endDateDateFormatted,
          priceTotal: formatPrice(response.data.price),
        };

        // SETA PREÇO TOTAL - DATA FINAL - MATRICULA - PLANO SELECIONADO
        setPriceTotal(data.priceTotal);
        setEndDate(data.endDate);
        setMatriculation(data);
        setPlanSelect(response.data.plan);

        setLoading(false);
      } catch (error) {
        toast.error('Erro ao listar planos');
      }
    }

    handleStudent();
  }, [id]);

  // PEGA O PLANO SELECIONADO E CALCULA O VALOR TOTAL
  function getPlanValue(e) {
    const planId = Number(e.target.value);
    const plan_selected = plan.find(x => x.id === planId);
    setPlanSelect(plan_selected);
    setPriceTotal(formatPrice(plan_selected.duration * plan_selected.price));
  }

  // PEGA O VALOR DA DATA DE INICIO
  function getDateStartValue(e) {
    const { value } = e.target;

    setStartDate(value);
  }

  // CALCULA QUANDO A MATRICULA VAI ACABAR
  useEffect(() => {
    if (planSelect && startDate) {
      const endDateFormatted = format(
        addMonths(addDays(new Date(startDate), 1), planSelect.duration),
        "dd'/'MM'/'yyyy"
      );

      setEndDate(endDateFormatted);
    }
  }, [planSelect, startDate]);

  // ATUALIZA MATRICULA
  async function handleSubmit({ planId, start_date }) {
    try {
      await api.put(`matriculations/${id}`, {
        plan_id: planId,
        start_date,
      });
      toast.success('Matrícula atualizada!');
    } catch (error) {
      toast.error('ERROR AO ATUALIZAR MATRÍCULA, VERIFIQUE OS DADOS!');
    }
  }

  return (
    <Container>
      <ContainerHeader>
        <h1>Edição de matrícula</h1>

        <RegisterOptions>
          <NavLink to="/matriculation">
            <MdChevronLeft color="#fff" size={20} />
            VOLTAR
          </NavLink>

          <button type="submit" form="form">
            <MdCheck color="#fff" size={20} />
            SALVAR
          </button>
        </RegisterOptions>
      </ContainerHeader>

      {loading ? (
        <ContainerLoading />
      ) : (
        <Form
          schema={schema}
          onSubmit={handleSubmit}
          initialData={matriculation}
          id="form"
        >
          <label htmlFor="student">ALUNO</label>
          <Input type="text" name="studentId" id="student" />

          <div>
            <div>
              <label htmlFor="plan">PLANO</label>
              <Select
                name="planId"
                id="plan"
                options={plan}
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
          </div>
        </Form>
      )}
    </Container>
  );
}

MatriculationsEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
