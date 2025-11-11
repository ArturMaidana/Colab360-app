import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // 1. Importar

import {
  HomeIcon,
  DashboardIcon,
  ProfileIcon,
  Megaphone,
  MegaphoneIcon,
  Chat,
} from '../Icons/Icons';

const iconConfig = {
  Home: HomeIcon,
  AttedanceToday: Chat,
  Profile: ProfileIcon,
};

export default ({ state, navigation }) => {
  const goTo = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      {/* 2. Trocar <View> por <LinearGradient> */}
      <LinearGradient
        colors={['#42C078', '#229F7C']} // Cores do gradiente
        start={{ x: 0, y: 0 }} // Gradiente horizontal
        end={{ x: 1, y: 0 }}
        style={styles.tabBar} // Aplicar o mesmo estilo
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const IconComponent = iconConfig[route.name];
          const iconColor = isFocused ? '#02613C' : '#FFFFFF';

          return (
            <Pressable
              key={route.name}
              style={styles.tabItem}
              onPress={() => goTo(route.name)}
              android_ripple={{
                color: 'rgba(255,255,255,0.2)',
                borderless: true,
              }}
            >
              <View
                style={
                  isFocused
                    ? styles.activeIconContainer
                    : styles.inactiveIconContainer
                }
              >
                {IconComponent && <IconComponent size={32} color={iconColor} />}
              </View>
            </Pressable>
          );
        })}
      </LinearGradient>
      {/* 2. Fim da troca */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 35,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    height: 70,
    width: '70%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 4,
  },
  tabItem: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  activeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
