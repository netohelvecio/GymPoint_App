import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';
import history from '~/services/history';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    // FAZ REQUISIÇÃO NA API COM O VALORES PASSADOS
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    // PEGA OS VALORES RETORNADOS DA API
    const { token, user } = response.data;

    // GUARDA TOKEN NO HEADER
    api.defaults.headers.Authorization = `Bearer ${token}`;

    // CHAMA A FUNÇÃO CASO HAJA SUCESSO PASSANDO O TOKEN E O USER
    yield put(signInSuccess(token, user));

    // DIRECIONA PARA PAGINA DE STUDENT
    history.push('/student');
  } catch (error) {
    // CASO HAJA UM ERRO EXIBE TOAST E CHAMA FUNCAO DE FAILURE DO REDUX
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

// FUNÇÃO PARA SETAR TOKEN NO HEADER
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

// FUNÇÃO PARA SAIR DO SISTEMA
export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
