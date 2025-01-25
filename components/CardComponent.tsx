import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Share,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import ViewShot from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

const CardComponent: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [isTextInputVisible, setIsTextInputVisible] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string>('🎉');
  const [bgColor, setBgColor] = useState<string>('#fff');
  const [fontSize, setFontSize] = useState<number>(28); // State to manage font size
  const [fontColor, setFontColor] = useState<string>('#333'); // State to manage font color
  const [isFontSettingsVisible, setIsFontSettingsVisible] = useState<boolean>(false); // Show font settings on text button click
  const viewShotRef = useRef<ViewShot>(null);
  const emojis = ['🎉', '🎂', '🎁', '❤️', '🌟', '🎈', '🎵', '🍰', '🍔', '🐾', '🍕', '🍩', '🥳', '🍦', '🌹'];

  const requestMediaLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to save the card!');
      return false;
    }
    return true;
  };

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

  const toggleTextInput = () => setIsTextInputVisible(!isTextInputVisible);

  const changeBgColor = () => {
    const colors = ['#FFEB3B', '#FF5722', '#8BC34A', '#03A9F4', '#9C27B0'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  const shareCard = async () => {
    try {
      const result = await Share.share({
        message: `Check out my card: ${emoji} ${text}`,
      });

      if (result.action === Share.sharedAction) {
        console.log('Card shared successfully!');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share action was dismissed');
      }
    } catch (error) {
      alert('Error sharing the card: ' + error.message);
    }
  };

  // Toggle the visibility of the font settings
  const toggleFontSettings = () => setIsFontSettingsVisible(!isFontSettingsVisible);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Card preview */}
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
        <View style={[styles.cardPreview, { backgroundColor: bgColor }]}>
          <Text style={[styles.cardText, { fontSize, color: fontColor }]}>{text}</Text>
          <Text style={styles.emoji}>{emoji}</Text>
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

        <TouchableOpacity onPress={changeBgColor} style={styles.actionButton}>
          <FontAwesome name="paint-brush" size={24} color="#6c5ce7" />
          <Text style={styles.actionText}>Color</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={shareCard} style={styles.actionButton}>
          <FontAwesome name="share-alt" size={24} color="#6c5ce7" />
          <Text style={styles.actionText}>Share</Text>
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

      {/* Font settings */}
      {isFontSettingsVisible && (
        <View style={styles.fontSettingsContainer}>
          <TouchableOpacity onPress={() => setFontSize(fontSize + 2)} style={styles.fontSettingButton}>
            <Text>Increase Font Size</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFontSize(fontSize - 2)} style={styles.fontSettingButton}>
            <Text>Decrease Font Size</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFontColor('#FF5733')} style={styles.fontSettingButton}>
            <Text>Change Font Color to Red</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFontColor('#33FF57')} style={styles.fontSettingButton}>
            <Text>Change Font Color to Green</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'linear-gradient(135deg, #6c5ce7, #00bcd4)',
  },
  cardPreview: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    height: 300,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardText: {
    marginTop: 10,
    fontSize: 28,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emoji: {
    fontSize: 50,
    marginVertical: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: 80,
  },
  actionText: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
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
    width: '100%',
  },
  fontSettingsContainer: {
    marginVertical: 20,
  },
  fontSettingButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  emojiButton: {
    margin: 5,
    padding: 10,
  },
  emojiText: {
    fontSize: 30,
  },
});

export default CardComponent;
