import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { Container } from './styles';

export default function Loading() {
  return (
    <Container>
      <AiOutlineLoading3Quarters color="#ee4d64" size={40} />
      <span>Carregando...</span>
    </Container>
  );
}
