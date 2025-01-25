// App.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CardComponent from './components/CardComponent';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* <CardComponent /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default App;
