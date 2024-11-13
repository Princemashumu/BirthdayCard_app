import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CardComponentStyles from '../styles/CardComponentStyles'; // Import custom styles

const CardComponent: React.FC = () => {
  const [text, setText] = useState<string>(''); 
  const [image, setImage] = useState<string | null>(null);
  const [isTextInputVisible, setIsTextInputVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Font settings
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const [fontSize, setFontSize] = useState<number>(16);
  const [color, setColor] = useState<string>('#000');
  const [position, setPosition] = useState<string>('left');

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

  const saveImage = () => {
    if (image) {
      console.log("Image saved:", image);
    } else {
      console.log("No image to save.");
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View style={CardComponentStyles.container}>
      {/* A4 Placeholder with border */}
      <View style={CardComponentStyles.a4Placeholder}>
        {image && (
          <FontAwesome name={image} size={100} color="#f39c12" style={CardComponentStyles.icon} />
        )}
        <Text style={[CardComponentStyles.text, { fontFamily, fontSize, color, textAlign: position }]}>{text}</Text>
      </View>

      {/* Text and Icons icons in a row */}
      <View style={styles.iconRow}>
        {/* Text icon */}
        <TouchableOpacity onPress={toggleTextInput} style={styles.iconButton}>
          <FontAwesome name="text-height" size={20} color="#f39c12" />
          <Text style={styles.iconText}>Text</Text>
        </TouchableOpacity>

        {/* Edit icon */}
        <TouchableOpacity onPress={toggleEdit} style={styles.iconButton}>
          <FontAwesome name="edit" size={20} color="#f39c12" />
          <Text style={styles.iconText}>Edit</Text>
        </TouchableOpacity>

        {/* Icons icon */}
        <TouchableOpacity onPress={() => setImage(null)} style={styles.iconButton}>
          <FontAwesome name="image" size={20} color="#f39c12" />
          <Text style={styles.iconText}>Upload</Text>
        </TouchableOpacity>
      </View>

      {/* Text input visibility toggle */}
      {isTextInputVisible && (
        <TextInput
          style={CardComponentStyles.textInput}
          placeholder="Add a birthday message..."
          onChangeText={setText}
          value={text}
        />
      )}

      {/* If in edit mode, show the TextInput again to edit */}
      {isEditing && (
        <View>
          {/* <TextInput
            style={CardComponentStyles.textInput}
            placeholder="Edit your message..."
            onChangeText={setText}
            value={text}
          /> */}
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
            onChangeText={(text) => setFontSize(Number(text))}
            placeholder="Font Size"
          />
          {/* Color Input */}
          <TextInput
            style={styles.input}
            value={color}
            onChangeText={setColor}
            placeholder="Text Color"
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

// Styles for the icons row and grid
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
    width:200,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 5,
    paddingLeft: 5,
    marginTop: 5,
  },
});

export default CardComponent;
