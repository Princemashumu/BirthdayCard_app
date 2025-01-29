import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  SplashScreen: undefined;
  Page: undefined;
};

type SplashScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SplashScreen'>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.jpeg')} style={styles.image} />
      <Text style={styles.title}>Welcome to Our App</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Page')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A82FB',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    color: '#6A82FB',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
