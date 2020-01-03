import React, { useState, useEffect } from 'react';
import { MdAdd, MdCheck } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
  Container,
  ContainerHeader,
  RegisterOptions,
  MatriculationTable,
  ButtonDelete,
  Pagination,
  ActiveMatriculation,
  EditOptions,
} from './styles';
import ContainerLoading from '~/components/Loading';

export default function Matriculations() {
  const [matriculation, setMatriculation] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // LISTA TODAS MATRICULAS
  async function loadMatriculation() {
    setLoading(true);
    const response = await api.get('matriculations', {
      params: {
        page,
      },
    });

    // FORMATA DATAS
    const data = response.data.map(d => ({
      ...d,
      startDateFormatted: format(
        parseISO(d.start_date),
        "dd 'de' LLLL 'de' yyyy",
        { locale: pt }
      ),
      endDateFormatted: format(parseISO(d.end_date), "dd 'de' LLLL 'de' yyyy", {
        locale: pt,
      }),
    }));

    setMatriculation(data);
    setLoading(false);
  }

  useEffect(() => {
    loadMatriculation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // DELETA MATRICULA
  async function deleteMatriculation(id) {
    const result = window.confirm('Deseja deletar aluno?');
    if (result) {
      await api.delete(`matriculations/${id}`);
      loadMatriculation();
      toast.success('Matrícula deletada!');
    }
  }

  return (
    <Container>
      <ContainerHeader>
        <h1>Gerenciando matrículas</h1>

        <RegisterOptions>
          <NavLink to="/matriculation/register">
            <MdAdd color="#fff" size={20} />
            CADASTRAR
          </NavLink>
        </RegisterOptions>
      </ContainerHeader>

      {loading ? (
        <ContainerLoading />
      ) : (
        <MatriculationTable>
          <thead>
            <th width={250}>ALUNO</th>
            <th>PLANO</th>
            <th>INÍCIO</th>
            <th>TÉRMINO</th>
            <th>ATIVA</th>
            <th />
          </thead>

          <tbody>
            {matriculation.map(m => (
              <tr key={m.id.toString()}>
                <td> {m.student.name} </td>
                <td> {m.plan.title} </td>
                <td> {m.startDateFormatted} </td>
                <td> {m.endDateFormatted} </td>
                <td>
                  <ActiveMatriculation active={m.active}>
                    <MdCheck color="#fff" size={20} />
                  </ActiveMatriculation>
                </td>
                <td>
                  <EditOptions>
                    <NavLink type="button" to={`/matriculation/${m.id}`}>
                      editar
                    </NavLink>
                    <ButtonDelete
                      type="button"
                      onClick={() => deleteMatriculation(m.id)}
                    >
                      apagar
                    </ButtonDelete>
                  </EditOptions>
                </td>
              </tr>
            ))}
          </tbody>
        </MatriculationTable>
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
