import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons'; // For icons
import CardComponentStyles from '../styles/CardComponentStyles'; // Import the styles

interface PreviewButtonProps {
  onPress: () => void; // Action when the button is pressed
}

const PreviewButton: React.FC<PreviewButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={CardComponentStyles.button} onPress={onPress}>
      <FontAwesome name="eye" size={20} color="#fff" /> {/* Changed icon to "eye" */}
      <Text style={CardComponentStyles.buttonText}>Preview</Text> {/* Updated text to "Preview" */}
    </TouchableOpacity>
  );
};

export default PreviewButton;
