import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons'; // Import FontAwesome icons
import CardComponentStyles from '../styles/CardComponentStyles'; // Import the styles

const CardComponent: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

  const birthdayIcons = [
    { name: 'cake', icon: 'birthday-cake' },
    { name: 'balloon', icon: 'glass-cheers' },
    { name: 'gift', icon: 'gift' }
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
          <FontAwesome name={image} size={200} color="#f39c12" style={CardComponentStyles.icon} />
        )}

        <Text style={CardComponentStyles.text}>{text}</Text>
      </View>

      <View style={CardComponentStyles.iconsContainer}>
        <TextInput
          style={CardComponentStyles.textInput}
          placeholder="Add a birthday message..."
          onChangeText={setText}
          value={text}
        />
        {birthdayIcons.map((icon) => (
          <TouchableOpacity
          key={icon.name}
          onPress={() => pickIcon(icon.icon)}
          style={CardComponentStyles.iconButton}
          >
            <FontAwesome name={icon.icon} size={50} color="#f39c12" />
            <Text>{icon.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

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

export default CardComponent;
