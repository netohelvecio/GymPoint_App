import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, TextLoading } from './styles';

export default function Loading() {
  return (
    <Container>
      <ActivityIndicator color="#ee4d64" size={60} />
      <TextLoading>Carregando...</TextLoading>
    </Container>
  );
}
