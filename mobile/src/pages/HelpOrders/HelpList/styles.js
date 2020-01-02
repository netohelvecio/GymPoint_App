import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  background-color: #eee;
  padding: 0 20px;
  flex: 1;
`;

export const HelpButton = styled(RectButton)`
  height: 50px;
  background: #ee4d64;
  border-radius: 4px;
  align-self: stretch;
  margin-top: 20px;

  align-items: center;
  justify-content: center;
`;

export const HelpButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

export const HelpList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 13px;
`;

export const Help = styled(RectButton)`
  background: #fff;
  margin: 7px 0;
  padding: 15px 18px;
  border-radius: 4px;
`;

export const HelpHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: baseline;
`;

export const ContainerAnswer = styled.View`
  flex-direction: row;
`;

export const CheckAnswer = styled.Text`
  font-size: 14px;
  color: ${props => (props.answer ? '#42cb58' : '#999')};
  font-weight: bold;
  margin-left: 5px;
`;

export const HelpTime = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const HelpQuestion = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-size: 14px;
  color: #444;
  line-height: 26px;
  max-height: 100px;
`;
