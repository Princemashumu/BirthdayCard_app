// screens/CardEditorScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import BirthdayCard from '../components/BirthdayCard';

export default function CardEditorScreen() {
  const [text, setText] = useState('Happy Birthday!');
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState('#000');

  return (
    <View style={styles.container}>
      <BirthdayCard text={text} fontSize={fontSize} color={color} />
      <TextInput
        style={styles.input}
        placeholder="Enter Card Text"
        value={text}
        onChangeText={setText}
      />
      <Button title="Edit Text" onPress={() => setFontSize(fontSize + 2)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: '60%',
  },
});
