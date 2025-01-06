import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

const CardComponent: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [isTextInputVisible, setIsTextInputVisible] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string>('🎉');

  const emojis = ['🎉', '🎂', '🎁', '❤️', '🌟', '🎈', '🎵', '🍰', '🍔', '🐾'];

  // Save the card to local storage
  const saveCardToLocalStorage = async () => {
    const cardData = {
      text,
      emoji,
    };

    try {
      const existingCards = JSON.parse(
        await FileSystem.readAsStringAsync(
          `${FileSystem.documentDirectory}cards.json`
        )
      );
      const updatedCards = existingCards ? [...existingCards, cardData] : [cardData];
      await FileSystem.writeAsStringAsync(
        `${FileSystem.documentDirectory}cards.json`,
        JSON.stringify(updatedCards)
      );
      alert('Card saved successfully!');
    } catch (error) {
      await FileSystem.writeAsStringAsync(
        `${FileSystem.documentDirectory}cards.json`,
        JSON.stringify([cardData])
      );
      alert('Card saved successfully!');
    }
  };

  // Toggle text input visibility
  const toggleTextInput = () => setIsTextInputVisible(!isTextInputVisible);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Card preview */}
      <View style={styles.cardPreview}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.cardText}>{text}</Text>
      </View>

      {/* Action buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={toggleTextInput} style={styles.actionButton}>
          <FontAwesome name="text-height" size={24} color="#6c5ce7" />
          <Text style={styles.actionText}>Text</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={saveCardToLocalStorage} style={styles.actionButton}>
          <FontAwesome name="save" size={24} color="#6c5ce7" />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Text input */}
      {isTextInputVisible && (
        <TextInput
          style={styles.textInput}
          placeholder="Add a message..."
          placeholderTextColor="#999"
          onChangeText={setText}
          value={text}
        />
      )}

      {/* Emoji picker */}
      <View style={styles.emojiGrid}>
        {emojis.map((emj, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setEmoji(emj)}
            style={styles.emojiButton}
          >
            <Text style={styles.emojiText}>{emj}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  cardPreview: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    height: 300, // Adjusted height for a more compact card
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    padding: 20, // Added padding for better spacing
  },
  cardText: {
    marginTop: 10,
    fontSize: 28, // Larger font size for better visibility
    color: '#333', // Dark text for better contrast
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emoji: {
    fontSize: 50, // Larger emoji size
    marginVertical: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: 100, // Fixed width for uniform button size
  },
  actionText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '100%', // Full width for better usability
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  emojiButton: {
    alignItems: 'center',
    margin: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: 60, // Fixed width for uniform button size
    height: 60, // Fixed height for uniform button size
    justifyContent: 'center', // Center the emoji inside the button
  },
  emojiText: {
    fontSize: 28,
  },
});

export default CardComponent;