import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

/**
 * Um card reutilizável para o menu "Acesso Rápido".
 *
 * @param {object} props
 * @param {React.ReactNode} props.icon
 * @param {string} props.title
 * @param {string} props.subtitle
 * @param {function} props.onPress
 * @param {boolean} [props.isFocused=false]
 */
export default function QuickAccessCard({
  icon,
  title,
  subtitle,
  onPress,
  isFocused = false,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.cardContainer, isFocused && styles.focusedCard]}
      android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: ms(10),
    padding: ms(20),
    height: ms(110),
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
  },
  focusedCard: {
    borderColor: '#00A859',
  },
  iconContainer: {
    alignSelf: 'flex-start',
  },
  textContainer: {
    alignSelf: 'flex-start',
  },
  titleText: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: ms(13.7),
    color: '#333',
  },
  subtitleText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: ms(10),
    color: '#666666',
  },
});
