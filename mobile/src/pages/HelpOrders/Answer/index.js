import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import logo from '~/assets/logo-header.png';
import {
  Container,
  Card,
  QuestionHeader,
  CardText,
  Time,
  Question,
  AnswerText,
} from './styles';

export default function Answer({ navigation }) {
  const answer = navigation.getParam('help');

  return (
    <Container>
      <Card>
        <QuestionHeader>
          <CardText>PERGUNTA</CardText>
          <Time>{answer.timeFormatted}</Time>
        </QuestionHeader>

        <Question>{answer.question}</Question>

        <CardText>RESPOSTA</CardText>

        <AnswerText>{answer.answer || 'Não respondido'}</AnswerText>
      </Card>
    </Container>
  );
}

Answer.navigationOptions = ({ navigation }) => ({
  headerTitle: <Image source={logo} />,
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.navigate('HelpList')}>
      <Icon name="chevron-left" size={30} color="#555" />
    </TouchableOpacity>
  ),
});

Answer.propTypes = {
  navigation: PropTypes.object.isRequired,
};
