import { TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Input = styled(TextInput)`
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 15px;
  align-self: stretch;
  margin-top: 15px;
`;

export const SubmitButton = styled(RectButton)`
  height: 50px;
  background: #ee4d64;
  border-radius: 4px;
  align-self: stretch;
  margin-top: 15px;

  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
