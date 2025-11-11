import React, { useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, Animated, Easing, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LogoColab1 from '../../assets/LogoColab1.svg';
import { UserContext } from '../../contexts/UserContext';

export default function SplashScreen({ navigation }) {
  const { loadStorage } = useContext(UserContext);
  const scaleValue = useRef(new Animated.Value(1.5)).current;
  const logoPositionX = useRef(new Animated.Value(0)).current;
  const nomeOpacity = useRef(new Animated.Value(0)).current;
  const nomePositionX = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const checkToken = async () => {
      loadStorage();
    };

    Animated.sequence([
      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
        Animated.timing(logoPositionX, {
          toValue: -60,
          duration: 1000,
          easing: Easing.elastic(1),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(400),
          Animated.parallel([
            Animated.timing(nomeOpacity, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(nomePositionX, {
              toValue: 65,
              duration: 500,
              easing: Easing.elastic(1.5),
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]),
    ]).start(() => {
      checkToken();
    });
  }, []);

  return (
    <LinearGradient colors={['#50D18D', '#00A859']} style={styles.container}>
      <Animated.View
        style={[
          styles.logoBlockContainer,
          {
            transform: [{ translateX: logoPositionX }, { scale: scaleValue }],
          },
        ]}
      >
        <Animated.Text style={[styles.colabText, { opacity: nomeOpacity }]}>
          Colab
        </Animated.Text>
        <LogoColab1 width={140} height={100} />
      </Animated.View>

      <Animated.View
        style={[
          styles.text360Container,
          {
            opacity: nomeOpacity,
            transform: [{ translateX: nomePositionX }],
          },
        ]}
      >
        <Text style={styles.text360}>360</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00A859',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBlockContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  text360Container: {
    position: 'absolute',
  },
  colabText: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 48,
    color: '#FFF',
    marginBottom: -10,
  },
  text360: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 80,
    right: -10,
    top: 10,
    color: '#FFF',
  },
});
