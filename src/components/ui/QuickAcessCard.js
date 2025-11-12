import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import {
  ArrowRightIcon,
  DocumentAddOutline,
  DocumentScanner,
  Graphcs,
  LocationPin3,
} from '../Icons/Icons';

export default function QuickAccessCard({ navigation }) {
  const [showFirstPage, setShowFirstPage] = useState(true);
  const rotation = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleToggle = () => {
    Animated.timing(rotation, {
      toValue: showFirstPage ? 1 : 0,
      duration: 300,
      easing: Easing.elastic(1.2),
      useNativeDriver: true,
    }).start();

    setShowFirstPage(!showFirstPage);

    Animated.sequence([
      Animated.spring(slideAnim, {
        toValue: showFirstPage ? -25 : 25,
        speed: 30,
        bounciness: 8,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
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
    <View style={styles.sectionContainer}>
      {/* Cabeçalho com título e seta */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Processos (15)</Text>

        <TouchableOpacity onPress={handleToggle} style={styles.arrowButton}>
          <Animated.View
            style={{
              transform: [{ rotate: rotateInterpolate }],
            }}
          >
            <ArrowRightIcon color="#333" size={22} />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Cards com animação */}
      <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
        {showFirstPage ? (
          <View style={styles.rowContainer}>
            <Pressable
              style={styles.cardContainer}
              onPress={() => navigation.navigate('Assinaturas')}
              android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
            >
              <View style={styles.iconContainer}>
                <DocumentAddOutline color="#229F7C" size={32} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Assinaturas</Text>
                <Text style={styles.subtitleText}>
                  Envelopes de Assinaturas
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={styles.cardContainer}
              onPress={() => navigation.navigate('Protocolo')}
              android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
            >
              <View style={styles.iconContainer}>
                <DocumentScanner color="#229F7C" size={32} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Protocolo Eletrônico</Text>
                <Text style={styles.subtitleText}>
                  Consulte seus protocolos
                </Text>
              </View>
            </Pressable>
          </View>
        ) : (
          <View style={styles.rowContainer}>
            <Pressable
              style={styles.cardContainer}
              onPress={() => navigation.navigate('Notas')}
              android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
            >
              <View style={styles.iconContainer}>
                <Graphcs color="#229F7C" size={32} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Gestão Atividades</Text>
                <Text style={styles.subtitleText}>
                  Gerencie suas atividades
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={styles.cardContainer}
              onPress={() => navigation.navigate('Alertas')}
              android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
            >
              <View style={styles.iconContainer}>
                <LocationPin3 color="#229F7C" size={32} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Transporte</Text>
                <Text style={styles.subtitleText}>
                  Solicitação de transporte
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: ms(10),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: ms(16),
    fontFamily: 'Ubuntu-Bold',
    color: '#333',
  },
  arrowButton: {
    padding: ms(4),
    backgroundColor: '#fff',
    borderRadius: ms(6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: ms(10),
    padding: ms(20),
    height: ms(90),
    width: ms(160),
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.0,
    elevation: 4,
    borderColor: 'transparent',
    borderWidth: ms(1),
    margin: ms(4),
    justifyContent: 'center',
  },
  iconContainer: {
    alignSelf: 'flex-start',
  },
  textContainer: {
    alignSelf: 'flex-start',
  },
  titleText: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: ms(12),
    color: '#333',
  },
  subtitleText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: ms(10),
    color: '#666666',
  },
});
