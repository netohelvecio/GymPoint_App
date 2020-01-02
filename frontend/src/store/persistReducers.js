import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// PERSIST PARA GUARDAR REDUCER DE AUTH CASO USUARIO DÊ F5 OU FECHA A PAGINA
export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gympoint',
      storage,
      whitelist: ['auth'],
    },
    reducers
  );

  return persistedReducer;
};
