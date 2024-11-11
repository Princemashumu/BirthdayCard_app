// components/SaveButton.tsx

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons'; // For icons
import CardComponentStyles from '../styles/CardComponentStyles'; // Import the styles

interface SaveButtonProps {
  onPress: () => void; // Action when the button is pressed
}

const SaveButton: React.FC<SaveButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={CardComponentStyles.button} onPress={onPress}>
      <FontAwesome name="save" size={20} color="#fff" />
      <Text style={CardComponentStyles.buttonText}>Save</Text>
    </TouchableOpacity>
  );
};

export default SaveButton;
