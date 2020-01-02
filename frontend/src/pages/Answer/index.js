import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';

import {
  Container,
  ContainerHeader,
  AnswerTable,
  Pagination,
  AnswerModal,
} from './styles';
import ContainerLoading from '~/components/Loading';

// ESTILIZAÇÃO DO MODAL
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement(document.getElementById('root'));

// VALIDAÇÃO DO FORM
const schema = Yup.object().shape({
  answerText: Yup.string().required('A resposta é obrigatória'),
});

export default function Answer() {
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  // ABRE MODAL E GUARDA PERGUNTA NO STATE
  function openModal(answer_) {
    setModal(true);
    setAnswer(answer_);
  }

  // FECHA MODAL
  function closeModal() {
    setModal(false);
  }

  // LISTA PERGUNTAS EXISTENTES
  useEffect(() => {
    async function handleAnswer() {
      try {
        setLoading(true);

        const response = await api.get('help-orders/answer', {
          params: {
            page,
          },
        });

        setLoading(false);
        setAnswers(response.data);
      } catch (error) {
        toast.error('Erro ao listar perguntas');
      }
    }

    handleAnswer();
  }, [page]);

  // RESPONDE PERGUNTA
  async function handleSubmit({ answerText }) {
    try {
      await api.post(`help-orders/${answer.id}/answer`, { answer: answerText });

      closeModal();
      toast.success('Pergunta respondida');
    } catch (error) {
      toast.error('Erro ao responder a pergunta');
    }
  }

  return (
    <Container>
      <ContainerHeader>
        <h1>Pedidos de auxílio</h1>
      </ContainerHeader>

      {loading ? (
        <ContainerLoading />
      ) : (
        <AnswerTable>
          <thead>
            <th>ALUNO</th>
            <th />
          </thead>

          <tbody>
            {answers.map(a => (
              <tr key={a.id.toString()}>
                <td> {a.student.name} </td>
                <td>
                  <div>
                    <button type="button" onClick={() => openModal(a)}>
                      responder
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          <Modal
            isOpen={modal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <AnswerModal>
              <span>PERGUNTA DO ALUNO</span>
              <p>{answer.question}</p>

              <Form schema={schema} onSubmit={handleSubmit}>
                <label htmlFor="answer">SUA RESPOSTA</label>
                <Input
                  type="text"
                  name="answerText"
                  id="answer"
                  placeholder="exemplo@email.com"
                  multiline
                  rows={8}
                />

                <button type="submit">Responder Aluno</button>
              </Form>
            </AnswerModal>
          </Modal>
        </AnswerTable>
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
