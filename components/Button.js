import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Button({ onPress, title }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = {
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },

  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'light',
    fontFamily: 'Urbanist'
  },
};
