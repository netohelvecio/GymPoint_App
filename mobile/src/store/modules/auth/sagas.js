import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  const { id } = payload;

  try {
    yield call(api.post, 'student-session', { id });

    yield put(signInSuccess(id));
  } catch (error) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login verifique o ID de cadastro'
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
