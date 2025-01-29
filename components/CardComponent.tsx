import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Share,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import ViewShot from 'react-native-view-shot';

interface CardComponentProps {
  selectedAnimation: any;
}

const CardComponent: React.FC<CardComponentProps> = ({ selectedAnimation }) => {
  const [text, setText] = useState<string>('');
  const [isTextInputVisible, setIsTextInputVisible] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string>('🎉');
  const [bgColor, setBgColor] = useState<string>('#fff');
  const [fontSize, setFontSize] = useState<number>(28);
  const [fontColor, setFontColor] = useState<string>('#333');
  const [isFontSettingsVisible, setIsFontSettingsVisible] = useState<boolean>(false);
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
      }
    } catch (error: any) {
      alert('Error sharing the card: ' + error.message);
    }
  };

  const toggleFontSettings = () => setIsFontSettingsVisible(!isFontSettingsVisible);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
        <View style={[styles.cardPreview, { backgroundColor: bgColor }]}>
          {selectedAnimation && (
            <Image
              source={selectedAnimation}
              style={styles.selectedAnimation}
              resizeMode="contain"
            />
          )}
          <Text style={[styles.cardText, { fontSize, color: fontColor }]}>{text}</Text>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
      </ViewShot>

      <View style={styles.actionRow}>
        <TouchableOpacity onPress={toggleTextInput} style={styles.actionButton}>
          <FontAwesome name="text-height" size={20} color="#6c5ce7" />
          {/* <Text style={styles.actionText}>Text</Text> */}
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleFontSettings} style={styles.actionButton}>
          <FontAwesome name="font" size={20} color="#6c5ce7" />
        </TouchableOpacity>

        <TouchableOpacity onPress={saveCardToGallery} style={styles.actionButton}>
          <FontAwesome name="save" size={20} color="#6c5ce7" />
        </TouchableOpacity>

        <TouchableOpacity onPress={changeBgColor} style={styles.actionButton}>
          <FontAwesome name="paint-brush" size={20} color="#6c5ce7" />
        </TouchableOpacity>

        <TouchableOpacity onPress={shareCard} style={styles.actionButton}>
          <FontAwesome name="share-alt" size={20} color="#6c5ce7" />
        </TouchableOpacity>
      </View>

      {isTextInputVisible && (
        <TextInput
          style={styles.textInput}
          placeholder="Add a message..."
          placeholderTextColor="#999"
          onChangeText={setText}
          value={text}
        />
      )}

      {isFontSettingsVisible && (
        <View style={styles.fontSettingsContainer}>
          <View style={styles.fontSizeControls}>
            <TouchableOpacity 
              onPress={() => setFontSize(Math.max(12, fontSize - 2))} 
              style={styles.fontSettingButton}
            >
              <FontAwesome name="minus" size={18} color="#333" />
            </TouchableOpacity>
            <Text style={styles.fontSizeText}>{fontSize}px</Text>
            <TouchableOpacity 
              onPress={() => setFontSize(Math.min(48, fontSize + 2))} 
              style={styles.fontSettingButton}
            >
              <FontAwesome name="plus" size={18} color="#333" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.colorPalette}>
            {['#333', '#FF5733', '#33FF57', '#3366FF', '#FF33FF'].map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setFontColor(color)}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  fontColor === color && styles.selectedColor
                ]}
              />
            ))}
          </View>
        </View>
      )}

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
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  selectedAnimation: {
    width: '100%',
    height: 150,
    marginBottom: 10,
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
    left: "15%",
    gap: 20,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 3,
    shadowRadius: 4,
    elevation: 6,
    width: 40,
    height: 40,
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
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  fontSettingButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 15,
  },
  fontSizeText: {
    fontSize: 16,
    color: '#333',
  },
  colorPalette: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  selectedColor: {
    borderColor: '#000',
    borderWidth: 3,
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