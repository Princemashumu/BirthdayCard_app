import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Dimensions, Image } from 'react-native';
import { Card } from '../types';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.8;
const cardHeight = cardWidth * 1;

interface CardsScreenProps {
  onSelectCard: (card: Card) => void;
}

const cardData: Card[] = [
  { id: '1', title: 'Birthday 1', animation: require('../assets/animations/Animation - 1737981383679.gif') },
  { id: '2', title: 'Birthday 2', animation: require('../assets/animations/Animation - 1737971598771.gif') },
  { id: '3', title: 'Birthday 3', animation: require('../assets/animations/Animation - 1737972098791.gif') },
  { id: '4', title: 'Birthday 4', animation: require('../assets/animations/Animation - 1737972364893.gif') },
];

const CardsScreen: React.FC<CardsScreenProps> = ({ onSelectCard }) => {
  return (
    <FlatList
      data={cardData}
      keyExtractor={(item) => item.id}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.column}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => onSelectCard(item)}>
          <Image 
            source={item.animation} 
            style={styles.lottie} 
            resizeMode="contain"
            onLoad={() => console.log(`${item.title} GIF loaded`)}
          />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  column: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#91C8E4',
    elevation: 5,
    shadowOpacity: 0.4,
    padding: 10,
  },
  lottie: {
    width: '70%',
    height: '70%',
    borderRadius: 0,
  },
});

export default CardsScreen;