// screens/SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  const [fontSize, setFontSize] = useState('24');
  const [color, setColor] = useState('#000');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Font Size</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={fontSize}
        onChangeText={setFontSize}
      />
      <Text style={styles.label}>Text Color</Text>
      <TextInput
        style={styles.input}
        value={color}
        onChangeText={setColor}
      />
      <Button title="Save Settings" onPress={() => {/* Save settings logic */}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    marginVertical: 10,
    fontSize: 16,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    marginBottom: 20,
  },
});
