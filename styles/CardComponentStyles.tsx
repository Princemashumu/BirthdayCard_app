import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// Define scaled dimensions for the A4 placeholder
const A4_WIDTH = screenWidth * 0.8;
const A4_HEIGHT = (A4_WIDTH * 297) / 210; // Maintain A4 aspect ratio

const CardComponentStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  a4Placeholder: {
    width: A4_WIDTH,
    height: A4_HEIGHT,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  textInput: {
    fontSize: 16,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 8,
    marginTop: 12,
    width: '100%',
  },
  text: {
    fontSize: 16,
    marginTop: 8,
    color: '#333',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  iconButton: {
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  buttonBox: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default CardComponentStyles;
