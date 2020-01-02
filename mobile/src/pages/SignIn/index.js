import React, { useState } from 'react';
import { Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';
import { Container, Input, SubmitButton, SubmitButtonText } from './styles';

export default function SignIn() {
  const [id, setId] = useState('');
  const loading = useSelector(state => state.auth.loading);

  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <Container>
      <Image source={logo} />

      <Input
        placeholder="Informe seu ID de cadastro"
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        keyboardType="numeric"
        value={id}
        onChangeText={setId}
      />

      <SubmitButton onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator size={20} color="#fff" />
        ) : (
          <SubmitButtonText>Entrar no sistema</SubmitButtonText>
        )}
      </SubmitButton>
    </Container>
  );
}
