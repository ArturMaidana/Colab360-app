import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import TodayCard from '../../components/ui/TodayCard';
import api from '../../services/endpont';
import Loading from '../../components/ui/Loading';
import { formatDate } from '../../utils/dateFormat';
import { dataAtual } from '../../utils/date';
import { s, vs, ms } from 'react-native-size-matters';

const isBeforeToday = dateString => {
  if (!dateString) return false;

  const eventDate = new Date(dateString);
  const today = new Date();

  const eventDateUTC = new Date(
    Date.UTC(
      eventDate.getUTCFullYear(),
      eventDate.getUTCMonth(),
      eventDate.getUTCDate(),
    ),
  );

  const todayDateUTC = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  );

  return eventDateUTC.getTime() < todayDateUTC.getTime();
};

export default function AttendanceToday({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [runningEvents, setRunningEvents] = useState([]);

  const intervalRef = useRef(null);

  const handleCardPress = event => {
    navigation.navigate('Atendimentos', {
      eventId: event.id,
      dateEvent: event.started_at,
      status: event.status,
    });
  };

  const dateNow = dataAtual();

  const loadTodayEvents = useCallback(async () => {
    try {
      const response = await api.getEventsAtendeDate(dateNow);

      const events = response.data || [];

      const executing = events
        .filter(ev => ev.status === 'Em execução')
        .map(ev => {
          const isEventBeforeToday = isBeforeToday(ev.started_at);
          return {
            ...ev,
            uiStatus: isEventBeforeToday
              ? 'Execução fora de Data'
              : 'Em Execução',
            isLocked: isEventBeforeToday,
          };
        });

      setRunningEvents(executing);
    } catch (error) {
      console.log('Erro ao carregar eventos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodayEvents();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => loadTodayEvents(), 5000);
    return () => clearInterval(intervalRef.current);
  }, [loadTodayEvents]);

  if (loading) return <Loading message="Carregando eventos..." />;

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Text style={styles.title}>
          Receba atualizações e avisos do Colab360
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContentContainer: {
    paddingHorizontal: s(25),
    paddingBottom: vs(120),
    paddingTop: vs(45),
  },
  title: {
    fontSize: ms(19),
    fontFamily: 'Ubuntu-Medium',
    color: '#333',
  },
  scrollcontainer: {
    padding: ms(2),
    marginTop: vs(10),
  },
  emptyText: {
    fontWeight: 'normal',
    fontSize: 14,
    color: '#555',
  },
});
