import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

import {
  Container,
  ContainerHeader,
  RegisterOptions,
  PlanTable,
  ButtonDelete,
  Pagination,
} from './styles';
import ContainerLoading from '~/components/Loading';

export default function Plans() {
  const [plan, setPlan] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // LISTA PLANOS EXISTENTES
    async function loadPlan() {
      try {
        setLoading(true);
        const response = await api.get('plans', {
          params: {
            page,
          },
        });

        // FORMATA DATA
        const data = response.data.map(p => ({
          ...p,
          durationFormatted: `${p.duration} mês`,
          priceFormatted: formatPrice(p.price),
        }));

        setPlan(data);
        setLoading(false);
      } catch (error) {
        toast.error('Erro ao listar planos');
      }
    }

    loadPlan();
  }, [page]);

  // DELETA PLANO
  async function deletePlan(id) {
    const result = window.confirm('Deseja deletar plano?');

    if (result) {
      try {
        await api.delete(`plans/${id}`);

        toast.success('Plano deletado!');
      } catch (error) {
        toast.error('Erro ao deletar plano');
      }
    }
  }

  return (
    <Container>
      <ContainerHeader>
        <h1>Gerenciando planos</h1>

        <RegisterOptions>
          <NavLink to="plan/register">
            <MdAdd color="#fff" size={20} />
            CADASTRAR
          </NavLink>
        </RegisterOptions>
      </ContainerHeader>

      {loading ? (
        <ContainerLoading />
      ) : (
        <PlanTable>
          <thead>
            <th width={400}>TÍTULO</th>
            <th>DURAÇÃO</th>
            <th>VALOR P/ MÊS</th>
            <th />
          </thead>

          <tbody>
            {plan.map(p => (
              <tr key={p.id.toString()}>
                <td> {p.title} </td>
                <td> {p.durationFormatted} </td>
                <td> {p.priceFormatted} </td>
                <td>
                  <div>
                    <NavLink type="button" to={`/plan/${p.id}`}>
                      editar
                    </NavLink>
                    <ButtonDelete
                      type="button"
                      onClick={() => deletePlan(p.id)}
                    >
                      apagar
                    </ButtonDelete>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </PlanTable>
      )}

      <Pagination>
        <button
          type="button"
          disabled={page < 2}
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </button>

        <span>Página {page} </span>

        <button type="button" onClick={() => setPage(page + 1)}>
          Próximo
        </button>
      </Pagination>
    </Container>
  );
}
