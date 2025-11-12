import React, { useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import Header from '../../components/ui/Header';
import {
  Microchip,
  UsersThree,
  DocumentAddOutline,
  DocumentScanner,
  ArrowRightIcon,
  LocationPin3,
  Graphcs,
  CommentOutlined,
  PlantFill,
  LikeFilled,
  LikeOutlined,
} from '../../components/Icons/Icons';
import QuickAccessCard from '../../components/ui/QuickAcessCard';
import AccessCard from '../../components/ui/AcessCard';
import PublicationCard from '../../components/ui/PublicationCard';
import Publication from '../../assets/Publication.png';
import AnimatedCardGroup from '../../components/ui/AnimatedCardGroup';

export default function Home({ navigation }) {
  const [showFirstPage, setShowFirstPage] = useState(true);

  const handlePressCard = () => {
    console.log('Post clicado!');
    // navigation.navigate('DetalhesDoPost'); // Exemplo de navegação
  };

  const handlePressLike = () => {
    console.log('Like clicado!');
  };

  const handlePressComment = () => {
    console.log('Comentário clicado!');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Header />

      <Text style={styles.sectionTitle}>Acesso Rápido</Text>

      <View style={styles.rowContainer}>
        <AccessCard
          title="Processos"
          subtitle="Visualize seus processos"
          onPress={() => navigation.navigate('Processos')}
          icon={<Microchip color="#229F7C" size={32} />}
          isFocused={true}
        />
        <AccessCard
          title="Colaborativo"
          subtitle="Atividades em conjunto"
          onPress={() => navigation.navigate('Colaborativo')}
          icon={<UsersThree color="#229F7C" size={32} />}
        />
      </View>

      <QuickAccessCard navigation={navigation} />

      <Text style={styles.sectionTitle}>Colaborativo</Text>
      <PublicationCard
        author="Sistema Famato"
        timeAgo="Famato - há 1 mês atrás"
        description="Com foco na qualidade, a Equipe de Pedagógica realizou duas pilotagens do treinamento:"
        imageUri={Publication}
        imageTag="Pilotagens"
        imageTitle="Produção Artesanal de Queijos Finos"
        imageSubtitle="Chapada dos Guimarães e Colniza"
        likesCount={1.894}
        commentsCount={230}
        onPressCard={handlePressCard}
        onPressLike={handlePressLike}
        onPressComment={handlePressComment}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
