import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,Keyboard  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CardComponentStyles from '../styles/CardComponentStyles'; // Import custom styles

const CardComponent: React.FC = () => {
  const [text, setText] = useState<string>('Happy Birthday!');
  const [image, setImage] = useState<string | null>('birthday-cake');  // Default image (icon)
  const [isTextInputVisible, setIsTextInputVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Font settings
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [fontSize, setFontSize] = useState<number>(16);
  const [color, setColor] = useState<string>('#000');
  const [position, setPosition] = useState<string>('center');

  // Available icons for birthday card
  const birthdayIcons = [
    { name: 'cake', icon: 'birthday-cake' },
    { name: 'gift', icon: 'gift' },
    { name: 'star', icon: 'star' },
    { name: 'heart', icon: 'heart' },
    { name: 'trophy', icon: 'trophy' },
    { name: 'thumbs-up', icon: 'thumbs-up' },
    { name: 'camera', icon: 'camera' },
    { name: 'paw', icon: 'paw' }
  ];

  const pickIcon = (iconName: string) => {
    setImage(iconName);
  };

  const toggleTextInput = () => {
    setIsTextInputVisible(!isTextInputVisible);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset font settings to default values
      setFontFamily('Arial');
      setFontSize(16);
      setColor('#000');
      setPosition('center');
    }
  };

  const handleFontSizeChange = (value: string) => {
    if (!isNaN(Number(value))) {
      setFontSize(Number(value));
    } else {
      alert('Font size must be a number.');
    }
  };

  const handleColorChange = (value: string) => {
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setColor(value);
    } else {
      alert('Please enter a valid hex color code.');
    }
  };

  // Function to split the text into individual characters for rotation
  const renderCurvedText = (text: string) => {
    const radius = 150; // Radius of the circle
    const angleBetweenLetters = 15; // Angle between each letter
    
    return text.split('').map((char, index) => {
      const angle = angleBetweenLetters * index - (angleBetweenLetters * (text.length - 1)) / 2;
      const transform = `rotate(${angle}deg) translateY(-${radius}px)`;

      return (
        <Text key={index} style={[styles.curvedText, { transform: [{ rotate: `${angle}deg` }, { translateY: -radius }] }]}>
          {char}
        </Text>
      );
    });
  };

  return (
    <View style={CardComponentStyles.container}>
      {/* Default Birthday Card */}
      <View style={CardComponentStyles.a4Placeholder}>
        {image && (
          <FontAwesome name={image} size={200} color="#f39c12" style={CardComponentStyles.icon} />
        )}
        
        {/* Render Curved Text */}
        <View style={styles.textContainer}>
          {renderCurvedText(text)}
        </View>
      </View>

      {/* Text and Icons icons in a row */}
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={toggleTextInput} style={styles.iconButton}>
          <FontAwesome name="text-height" size={20} color="#f39c12" />
          <Text style={styles.iconText}>Text</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleEdit} style={styles.iconButton}>
          <FontAwesome name="edit" size={20} color="#f39c12" />
          <Text style={styles.iconText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setImage(null)} style={styles.iconButton}>
          <FontAwesome name="image" size={20} color="#f39c12" />
          <Text style={styles.iconText}>Upload</Text>
        </TouchableOpacity>
      </View>

      {/* Text input visibility toggle */}
      {isTextInputVisible && (
        <TextInput
          style={CardComponentStyles.textInput}
          placeholder="Edit your message..."
          onChangeText={setText}
          value={text}
        />
      )}

      {/* If in edit mode, show the TextInput again to edit */}
      {isEditing && (
        <View>
          <Text style={[CardComponentStyles.text, { fontFamily, fontSize, color, textAlign: position }]}>
            Preview: {text || 'Your text here'}
          </Text>
          {/* Font Family Input */}
          <TextInput
            style={styles.input}
            value={fontFamily}
            onChangeText={setFontFamily}
            placeholder="Font Family"
          />
          {/* Font Size Input */}
          <TextInput
            style={styles.input}
            value={String(fontSize)}
            keyboardType="numeric"
            onChangeText={handleFontSizeChange}
            placeholder="Font Size"
          />
          {/* Color Input */}
          <TextInput
            style={styles.input}
            value={color}
            onChangeText={handleColorChange}
            placeholder="Text Color (e.g., #FF5733)"
          />
          {/* Position Input */}
          <TextInput
            style={styles.input}
            value={position}
            onChangeText={setPosition}
            placeholder="Text Position (left, center, right)"
          />
        </View>
      )}

      {/* Icons selection grid */}
      {!isEditing && (
        <View style={styles.iconsGrid}>
          {birthdayIcons.map((icon) => (
            <TouchableOpacity
              key={icon.name}
              onPress={() => pickIcon(icon.icon)}
              style={styles.iconButton}
            >
              <FontAwesome name={icon.icon} size={20} color="#f39c12" />
              <Text style={styles.iconText}>{icon.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Buttons */}
      <View style={CardComponentStyles.buttonsContainer}>
        <View style={CardComponentStyles.buttonBox}>
          <TouchableOpacity style={CardComponentStyles.button}>
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

// Styles for curved text effect
const styles = StyleSheet.create({
  iconRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    width: '100%',
  },
  iconButton: {
    alignItems: 'center',
    marginBottom: 10,
    width: 60,
    marginHorizontal: 10,
  },
  iconText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  iconsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  input: {
    height: 30,
    width: 200,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 5,
    paddingLeft: 5,
    marginTop: 5,
  },
  textContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  curvedText: {
    position: 'absolute',
    fontSize: 30,
    color: '#000',
    fontFamily: 'Arial',
    textAlign: 'center',
    fontWeight:'bold',
    bottom:150
  },
});

export default CardComponent;
