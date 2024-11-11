import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import CardComponentStyles from '../styles/CardComponentStyles'; // Import your custom styles

const CardComponent: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

  // Add more icons to the list
  const birthdayIcons = [
    { name: 'cake', icon: 'birthday-cake' },
    { name: 'balloon', icon: 'glass-cheers' },
    { name: 'gift', icon: 'gift' },
    { name: 'star', icon: 'star' },
    { name: 'heart', icon: 'heart' },
    { name: 'smile', icon: 'smile' },
    { name: 'tree', icon: 'tree' },
    { name: 'trophy', icon: 'trophy' },
    { name: 'thumbs-up', icon: 'thumbs-up' },
    { name: 'camera', icon: 'camera' },
    { name: 'paw', icon: 'paw' },
    { name: 'globe', icon: 'globe' }
  ];

  const pickIcon = (iconName: string) => {
    setImage(iconName);
  };

  const saveImage = () => {
    if (image) {
      console.log("Image saved:", image);
    } else {
      console.log("No image to save.");
    }
  };

  return (
    <View style={CardComponentStyles.container}>
      {/* A4 Placeholder with border */}
      <View style={CardComponentStyles.a4Placeholder}>
        {image && (
          <FontAwesome name={image} size={100} color="#f39c12" style={CardComponentStyles.icon} />
        )}
        <Text style={CardComponentStyles.text}>{text}</Text>
      </View>

      {/* Text input */}
      <TextInput
        style={CardComponentStyles.textInput}
        placeholder="Add a birthday message..."
        onChangeText={setText}
        value={text}
      />

      {/* Icon grid selection */}
      <View style={styles.iconsGrid}>
        {birthdayIcons.map((icon) => (
          <TouchableOpacity
            key={icon.name}
            onPress={() => pickIcon(icon.icon)}
            style={styles.iconButton}
          >
            <FontAwesome name={icon.icon} size={40} color="#f39c12" />
            <Text style={styles.iconText}>{icon.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Buttons */}
      <View style={CardComponentStyles.buttonsContainer}>
        <View style={CardComponentStyles.buttonBox}>
          <TouchableOpacity style={CardComponentStyles.button} onPress={saveImage}>
            <FontAwesome name="save" size={20} color="#fff" />
            <Text style={CardComponentStyles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={CardComponentStyles.buttonBox}>
          <TouchableOpacity style={CardComponentStyles.button} onPress={() => setImage(null)}>
            <FontAwesome name="eye" size={20} color="#fff" />
            <Text style={CardComponentStyles.buttonText}>Preview</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styles for the icons grid
const styles = StyleSheet.create({
  iconsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconButton: {
    alignItems: 'center',
    marginBottom: 20,
    width: 60, // Adjust width to fit more icons
    marginHorizontal: 10, // Space between icons
  },
  iconText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  }
});

export default CardComponent;
