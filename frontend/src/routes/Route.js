import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';
import { store } from '~/store';

// VALIDAÇÃO DAS ROTAS PRIVADAS
export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signed } = store.getState().auth; // TRUE = USUARIO LOGADO - FALSE = USUARIO NÃO LOGADO

  // CASO O USUARIO NÃO ESTIVER LOGADO É REDIRECIONADO PARA PAGINA DE LOGIN
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  // CARREGA LAYOUT DE ACORDO COM O VALOR DE SIGNED
  const Layout = signed ? DefaultLayout : AuthLayout;

  // RETORNA LAYOUT
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

// VALIDAÇÃO DAS PROPS
RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

// VALOR PADRÃO DAS ROTAS
RouteWrapper.defaultProps = {
  isPrivate: false,
};
