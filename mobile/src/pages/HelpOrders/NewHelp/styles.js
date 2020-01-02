import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  background-color: #eee;
  padding: 0 20px;
  flex: 1;
`;

export const Input = styled.TextInput`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 15px;
  align-self: stretch;
  margin-top: 15px;
  font-size: 18px;
`;

export const SubmitButton = styled(RectButton)`
  height: 50px;
  background: #ee4d64;
  border-radius: 4px;
  align-self: stretch;
  margin-top: 20px;

  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
