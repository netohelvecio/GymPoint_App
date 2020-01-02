import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';

import api from '~/services/api';
import Header from '~/components/Header';
import Loading from '~/components/Loading';

import {
  Container,
  HelpButton,
  HelpButtonText,
  HelpList,
  Help,
  HelpHeader,
  ContainerAnswer,
  CheckAnswer,
  HelpTime,
  HelpQuestion,
} from './styles';

function HelpOrders({ navigation, isFocused }) {
  const [helps, setHelps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const id = useSelector(state => state.auth.id);

  async function loadHelpOrders() {
    try {
      if (page === 1) {
        setLoading(true);
      }

      const response = await api.get(`students/${id}/help-orders`, {
        params: {
          page,
        },
      });

      const data = response.data.map(help => ({
        ...help,
        timeFormatted: formatDistanceToNow(parseISO(help.updated_at), {
          locale: pt,
          addSuffix: true,
        }),
      }));

      if (page >= 2) {
        const newData = helps.concat(data);
        setHelps(newData);
      } else {
        setHelps(data);
      }

      setLoading(false);
    } catch (error) {
      Alert.alert('Erro!', 'Erro ao listar perguntas');
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, page]);

  async function loadMore() {
    setPage(page + 1);
  }

  return (
    <>
      <Header />

      <Container>
        <HelpButton onPress={() => navigation.navigate('NewHelp')}>
          <HelpButtonText>Novo pedido de auxílio </HelpButtonText>
        </HelpButton>

        {loading ? (
          <Loading />
        ) : (
          <HelpList
            data={helps}
            keyExtractor={item => item.id.toString()}
            onEndReachedThreshold={0.2}
            onEndReached={loadMore}
            renderItem={({ item: help }) => (
              <Help onPress={() => navigation.navigate('Answer', { help })}>
                <HelpHeader>
                  <ContainerAnswer>
                    <Icon
                      name="check"
                      size={16}
                      color={help.answer ? '#42cb58' : '#999'}
                    />
                    <CheckAnswer answer={help.answer}>
                      {help.answer ? 'Respondido' : 'Não respondido'}
                    </CheckAnswer>
                  </ContainerAnswer>

                  <HelpTime>{help.timeFormatted}</HelpTime>
                </HelpHeader>

                <HelpQuestion>{help.question}</HelpQuestion>
              </Help>
            )}
          />
        )}
      </Container>
    </>
  );
}

HelpOrders.navigationOptions = {
  headerTransparent: true,
};

HelpOrders.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default withNavigationFocus(HelpOrders);
