// components/CardComponent.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CardComponent: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

  // Function to pick an image from the library
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.card}>
      {/* Display selected image */}
      {image && <Image source={{ uri: image }} style={styles.image} />}

      {/* Text input for user message */}
      <TextInput
        style={styles.textInput}
        placeholder="Add a birthday message..."
        onChangeText={setText}
        value={text}
      />
      <Text style={styles.text}>{text}</Text>

      {/* Button to select an image */}
      <Button title="Pick an Image" onPress={pickImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
  },
  textInput: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
    width: '100%',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    marginTop: 10,
  },
});

export default CardComponent;
