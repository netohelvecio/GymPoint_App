import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #eee;
  padding: 0 20px;
  flex: 1;
`;

export const Card = styled.View`
  margin-top: 20px;
  background: #fff;
  padding: 15px 18px;
  border-radius: 4px;
`;

export const QuestionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const CardText = styled.Text`
  color: #444;
  font-weight: bold;
  font-size: 14px;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const Question = styled.Text`
  font-size: 14px;
  color: #444;
  line-height: 26px;
  margin-bottom: 10px;
`;

export const AnswerText = styled.Text`
  font-size: 14px;
  color: #444;
  line-height: 26px;
  margin-top: 10px;
`;
