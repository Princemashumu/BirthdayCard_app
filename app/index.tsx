import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Platform } from 'react-native';
import CardComponent from '../components/CardComponent';
import CardsScreen from '../components/CardsScreen';
import { FontAwesome } from '@expo/vector-icons';
import { Card } from '../types';

const Page: React.FC = () => {
  const [showCards, setShowCards] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card>({
    id: '1',
    title: 'Birthday 1',
    animation: require('../assets/animations/Animation - 1737981383679.gif'),
  });

  const handleCardSelect = (card: Card) => {
    setSelectedCard(card);
    setShowCards(false);
  };

  return (
    <View style={styles.container}>
      {showCards ? (
        <CardsScreen onSelectCard={handleCardSelect} />
      ) : (
        <CardComponent selectedAnimation={selectedCard.animation} />
      )}

      <View style={styles.bottomAppBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setShowCards(true)}>
          <FontAwesome name="list" size={24} color="#6A82FB" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => setShowCards(false)}>
          <FontAwesome name="home" size={32} color="#6A82FB" />
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.iconButton} onPress={() => setShowCards(false)}>
          <FontAwesome name="download" size={24} color="#6A82FB" />
          <Text style={styles.iconText}>Download</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5bd9ff',
  },
  bottomAppBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 90,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
      },
      android: {
        elevation: 10,
        shadowOpacity: 0.4,
      },
    }),
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: '#5bd9ff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  iconText: {
    color: '#6A82FB',
    fontSize: 12,
    marginTop: 5,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

export default Page;