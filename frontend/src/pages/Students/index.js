import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  Container,
  ContainerHeader,
  RegisterOptions,
  StudentTable,
  ButtonDelete,
  Pagination,
} from './styles';
import ContainerLoading from '~/components/Loading';

export default function Students() {
  // STATES DA PAGINA
  const [student, setStudent] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // CARREGA TODOS OS ESTUDANTES COM PAGINAÇÃO
  useEffect(() => {
    async function loadStudent() {
      try {
        setLoading(true);
        const response = await api.get('students', {
          params: {
            page,
            name,
          },
        });

        setStudent(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Erro ao listar estudantes');
      }
    }

    loadStudent();
  }, [name, page]);

  // FILTRA NOME
  function filterName(e) {
    const studentName = e.target.value;

    setName(studentName);
  }

  // FUNÇÃO PARA DELETAR ESTUDANTE
  async function deleteStudent(id) {
    const result = window.confirm('Deseja deletar aluno?');

    if (result) {
      try {
        await api.delete(`students/${id}`);

        toast.success('Aluno deletado!');
      } catch (error) {
        toast.error('Error ao deletar estudante');
      }
    }
  }

  return (
    <Container>
      <ContainerHeader>
        <h1>Gerenciando alunos</h1>

        <RegisterOptions>
          <NavLink to="student/register">
            <MdAdd color="#fff" size={20} />
            CADASTRAR
          </NavLink>

          <div>
            <MdSearch color="#999" size={20} />
            <input
              type="text"
              placeholder="Buscar aluno"
              value={name}
              onChange={filterName}
            />
          </div>
        </RegisterOptions>
      </ContainerHeader>

      {loading ? (
        <ContainerLoading />
      ) : (
        <StudentTable>
          <thead>
            <th width={400}>NOME</th>
            <th>E-MAIL</th>
            <th>IDADE</th>
            <th />
          </thead>

          <tbody>
            {student.map(s => (
              <tr key={s.id.toString()}>
                <td> {s.name} </td>
                <td> {s.email} </td>
                <td> {s.age} </td>
                <td>
                  <div>
                    <NavLink type="button" to={`/student/${s.id}`}>
                      editar
                    </NavLink>
                    <ButtonDelete
                      type="button"
                      onClick={() => deleteStudent(s.id)}
                    >
                      apagar
                    </ButtonDelete>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </StudentTable>
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
