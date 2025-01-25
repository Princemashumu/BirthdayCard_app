import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import CardComponent from '../components/CardComponent';
import { FontAwesome } from '@expo/vector-icons';

const Page: React.FC = () => {
  return (
    <View style={styles.container}>
      <CardComponent />
      
      {/* Bottom App Bar */}
      <View style={styles.bottomAppBar}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="home" size={24} color="#fff" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        
        {/* Add more buttons as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#7E57C2', // Modern light neutral tone
    },
  bottomAppBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80, // Slightly taller for a modern look
    backgroundColor: '#6200ea', // Modern purple color
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    borderTopLeftRadius: 20, // Rounded corners
    borderTopRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10, // Rounded corners for buttons
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slight background for buttons
  },
  iconText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5, // Space between icon and text
  },
});

export default Page;