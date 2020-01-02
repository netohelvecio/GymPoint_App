import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content } from './styles';
import logo from '~/assets/images/logo-header.png';

export default function Header() {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.auth); //INFO DE USER LOGADO

  // DISPARA FUNÇÃO PARA SAIR DO SISTEMA
  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <NavLink to="/student" activeStyle={{ color: '#444' }}>
            ALUNOS
          </NavLink>
          <NavLink to="/plan" activeStyle={{ color: '#444' }}>
            PLANOS
          </NavLink>
          <NavLink to="/matriculation" activeStyle={{ color: '#444' }}>
            MATRÍCULAS
          </NavLink>
          <NavLink to="/answer" activeStyle={{ color: '#444' }}>
            PEDIDOS DE AUXÍLIO
          </NavLink>
        </nav>

        <div>
          <span>{profile.name}</span>
          <a onClick={handleSignOut}>Sair do sistema</a>
        </div>
      </Content>
    </Container>
  );
}
