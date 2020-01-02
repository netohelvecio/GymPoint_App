import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  background-color: #eee;
  padding: 0 20px;
  flex: 1;
`;

export const CheckinButton = styled(RectButton)`
  height: 50px;
  background: #ee4d64;
  border-radius: 4px;
  align-self: stretch;
  margin-top: 20px;

  align-items: center;
  justify-content: center;
`;

export const CheckinButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;

export const CheckinList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 13px;
`;

export const Checkin = styled.View`
  background: #fff;
  margin: 7px 0;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 18px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const CheckinNumber = styled.Text`
  color: #444;
  font-weight: bold;
`;

export const CheckinTime = styled.Text`
  color: #666;
  font-size: 12px;
`;
