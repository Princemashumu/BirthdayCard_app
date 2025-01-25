import React, { useState, useRef } from 'react'; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import ViewShot from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

const CardComponent: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [isTextInputVisible, setIsTextInputVisible] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string>('🎉');
  const [bgColor, setBgColor] = useState<string>('#fff'); // State to manage background color
  const viewShotRef = useRef<ViewShot>(null);
  const emojis = ['🎉', '🎂', '🎁', '❤️', '🌟', '🎈', '🎵', '🍰', '🍔', '🐾', '🍕', '🍩', '🥳', '🍦', '🌹'];


  // Request media library permissions
  const requestMediaLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to save the card!');
      return false;
    }
    return true;
  };

  // Save the card to the gallery
  const saveCardToGallery = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    if (viewShotRef.current) {
      try {
        const uri = await viewShotRef.current.capture();
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('Birthday Cards', asset, false);
        alert('Card saved to gallery successfully!');
      } catch (error) {
        console.error('Error saving card to gallery:', error);
        alert('Failed to save card to gallery. Please try again.');
      }
    }
  };

  // Toggle text input visibility
  const toggleTextInput = () => setIsTextInputVisible(!isTextInputVisible);

  // Change background color of the card
  const changeBgColor = () => {
    const colors = ['#FFEB3B', '#FF5722', '#8BC34A', '#03A9F4', '#9C27B0'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor); // Set a new random background color
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Card preview */}
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
        <View style={[styles.cardPreview, { backgroundColor: bgColor }]}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.cardText}>{text}</Text>
        </View>
      </ViewShot>

      {/* Action buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={toggleTextInput} style={styles.actionButton}>
          <FontAwesome name="text-height" size={24} color="#6c5ce7" />
          <Text style={styles.actionText}>Text</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={saveCardToGallery} style={styles.actionButton}>
          <FontAwesome name="save" size={24} color="#6c5ce7" />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>

        {/* Button to change background color */}
        <TouchableOpacity onPress={changeBgColor} style={styles.actionButton}>
          <FontAwesome name="paint-brush" size={24} color="#6c5ce7" />
          <Text style={styles.actionText}>Color</Text>
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
    backgroundColor: 'transparent', // Set to transparent for gradient
    background: 'linear-gradient(135deg, #6c5ce7, #00bcd4)', // Modern gradient background
  },  
  cardPreview: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    height: 300, // Adjusted height for a more compact card
    marginBottom: 20,
    padding: 20, // Added padding for better spacing
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
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
