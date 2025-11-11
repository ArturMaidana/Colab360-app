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
import PublicationCard from '../../components/ui/PublicationCard';

export default function Home({ navigation }) {
  const [showFirstPage, setShowFirstPage] = useState(true);

  const rotation = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

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

  const handleToggle = () => {
    // Gira a seta com leve elasticidade
    Animated.timing(rotation, {
      toValue: showFirstPage ? 1 : 0,
      duration: 300,
      easing: Easing.elastic(1.2),
      useNativeDriver: true,
    }).start();

    // Troca o conteúdo instantaneamente
    setShowFirstPage(!showFirstPage);

    // Executa o "bump" elástico rápido pro lado
    Animated.sequence([
      Animated.spring(slideAnim, {
        toValue: showFirstPage ? -25 : 25, // puxa rápido pro lado
        speed: 30,
        bounciness: 8,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0, // volta pro centro
        speed: 20,
        bounciness: 6,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Header />

      <Text style={styles.sectionTitle}>Acesso Rápido</Text>

      <View style={styles.rowContainer}>
        <QuickAccessCard
          title="Processos"
          subtitle="Visualize seus processos"
          onPress={() => navigation.navigate('Processos')}
          icon={<Microchip color="#229F7C" size={32} />}
          isFocused={true}
        />
        <QuickAccessCard
          title="Colaborativo"
          subtitle="Atividades em conjunto"
          onPress={() => navigation.navigate('Colaborativo')}
          icon={<UsersThree color="#229F7C" size={32} />}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Processos (15)</Text>
        <TouchableOpacity onPress={handleToggle}>
          <Animated.View
            style={{
              transform: [{ rotate: rotateInterpolate }],
            }}
          >
            <ArrowRightIcon color="#333" size={24} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={{
          transform: [{ translateX: slideAnim }],
        }}
      >
        {showFirstPage ? (
          <View style={styles.rowContainer}>
            <QuickAccessCard
              title="Assinaturas"
              subtitle="Envelopes de Assinaturas"
              onPress={() => navigation.navigate('Assinaturas')}
              icon={<DocumentAddOutline color="#229F7C" size={32} />}
            />
            <QuickAccessCard
              title="Protocolo Eletrônico"
              subtitle="Consulte seus protocolos"
              onPress={() => navigation.navigate('Protocolo')}
              icon={<DocumentScanner color="#229F7C" size={32} />}
            />
          </View>
        ) : (
          <View style={styles.rowContainer}>
            <QuickAccessCard
              title="Gestão Atividades"
              subtitle="Gerencie suas atividades"
              onPress={() => navigation.navigate('Notas')}
              icon={<Graphcs color="#229F7C" size={32} />}
            />
            <QuickAccessCard
              title="Transporte"
              subtitle="Solicitação de transporte"
              onPress={() => navigation.navigate('Alertas')}
              icon={<LocationPin3 size={32} color="#229F7C" />}
            />
          </View>
        )}
      </Animated.View>

      <Text style={styles.sectionTitle}>Colaborativo</Text>
      <PublicationCard
        author="Sistema Famato"
        timeAgo="há 1 mês atrás"
        description="Com foco na qualidade, a Equipe de Pedagógica realizou duas pilotagens do treinamento:"
        imageUri="https://via.placeholder.com/600x400/00A859/FFFFFF?text=Producao+Artesanal+de+Queijos+Finos" // Substitua pela URL da sua imagem
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
    fontFamily: 'Ubuntu-Medium',
    color: '#333',
    marginBottom: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
