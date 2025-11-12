import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import QuickAccessCard from './QuickAcessCard';
import { ArrowRightIcon } from '../Icons/Icons';

export default function AnimatedCardGroup({ firstPage, secondPage }) {
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

    Animated.sequence([
      Animated.spring(slideAnim, {
        toValue: showFirstPage ? -30 : 30,
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

    setShowFirstPage(!showFirstPage);
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View>
      <View style={styles.rowContainer}>
        <Animated.View
          style={{
            transform: [{ translateX: slideAnim }],
          }}
        >
          {showFirstPage ? (
            <View style={styles.rowContainer}>
              {firstPage.map((card, idx) => (
                <QuickAccessCard key={idx} {...card} />
              ))}
            </View>
          ) : (
            <View style={styles.rowContainer}>
              {secondPage.map((card, idx) => (
                <QuickAccessCard key={idx} {...card} />
              ))}
            </View>
          )}
        </Animated.View>
      </View>

      <TouchableOpacity
        onPress={handleToggle}
        style={styles.arrowButton}
        activeOpacity={0.7}
      >
        <Animated.View
          style={{
            transform: [{ rotate: rotateInterpolate }],
          }}
        >
          <ArrowRightIcon color="#333" size={24} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  arrowButton: {
    alignSelf: 'center',
    marginTop: 4,
    padding: 6,
  },
});
