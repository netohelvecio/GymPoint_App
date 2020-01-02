import { all } from 'redux-saga/effects';

import auth from './auth/sagas';

// SAGA EXISTENTES
export default function* rootSaga() {
  return yield all([auth]);
}
