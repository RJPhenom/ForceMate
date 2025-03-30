import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './components/Button';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the app!</Text>
      <Button onPress={() => alert('New List Added')} title="➕ Add New List" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
