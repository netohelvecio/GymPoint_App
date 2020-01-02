import produce from 'immer';

// ESTADO INICIAL DO REDUCER
const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  profile: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      // QUANDO A REQUISIÇÃO LOADING INICIA
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      // CASO REQUISIÇÃO SEJA COM SUCESSO GUARDA TOKEN E INFO DO USER
      case '@auth/SIGN_IN_SUCCESS': {
        draft.loading = false;
        draft.signed = true;
        draft.token = action.payload.token;
        draft.profile = action.payload.user;
        break;
      }
      // CASO FALHE, DESATIVA LOADING
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      // CASE SET DEFAULT VALORE DO REDUCER
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
