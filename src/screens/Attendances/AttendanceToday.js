import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import TodayCard from '../../components/ui/TodayCard';
import api from '../../services/endpont';
import Loading from '../../components/ui/Loading';
import { formatDate } from '../../utils/dateFormat';
import { dataAtual } from '../../utils/date';
import { s, vs, ms } from 'react-native-size-matters';

export default function AttendanceToday({ navigation }) {
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

        <ScrollView style={styles.scrollcontainer}>
          <TodayCard
            tagText="Novo"
            idText="Contrato TOTVS - TAE"
            location="AVISO: Um novo contrato TOTVS - TAE foi criado e aguarda sua análise. VIsualize os detalhes e acompanhe o andamento."
            date="13:03"
            statusText="Visualizar Detalhes" // Usa o status da UI
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContentContainer: {
    paddingHorizontal: s(15),
    paddingBottom: vs(120),
    paddingTop: vs(35),
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
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: '#555',
  },
});
