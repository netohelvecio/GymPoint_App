import React, { useState } from 'react';
import {
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';

import logo from '~/assets/logo-header.png';
import { Container, Input, SubmitButton, SubmitButtonText } from './styles';

export default function NewHelp({ navigation }) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const id = useSelector(state => state.auth.id);

  async function handleSubmit() {
    try {
      setLoading(true);

      await api.post(`students/${id}/help-orders`, { question });
      Alert.alert('Pergunta enviada!');
      navigation.navigate('HelpList');

      setLoading(false);
    } catch (error) {
      Alert.alert('Erro!', 'Erro ao enviar pergunta');
      setLoading(false);
    }
  }

  return (
    <Container>
      <Input
        multiline
        numberOfLines={12}
        textAlignVertical="top"
        placeholder="Inclua seu pedido de auxílio"
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        value={question}
        onChangeText={setQuestion}
      />
      <SubmitButton onPress={handleSubmit}>
        {loading ? (
          <ActivityIndicator color="#fff" size={24} />
        ) : (
          <SubmitButtonText>Enviar pedido</SubmitButtonText>
        )}
      </SubmitButton>
    </Container>
  );
}

NewHelp.navigationOptions = ({ navigation }) => ({
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

NewHelp.propTypes = {
  navigation: PropTypes.object.isRequired,
};
