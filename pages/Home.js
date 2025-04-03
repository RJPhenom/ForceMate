import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';

// My imports
// Assets
import * as Colours from '../assets/colours';
import * as Icons from '../assets/icons';

// Components
import RowCard from '../components/RowCard';

// CONSTS
const addIconHeight = Platform.OS === 'web' ? 20 : '80%';
const addButtonWidth = Platform.OS === 'web' ? 200 : '50%';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <RowCard onPress={() => {}} thumbnail={Icons.SmallPlusIconBlack} text='Add New List...' points='50' />
      <TouchableOpacity style={styles.addListButton}>
        <Image source={require('../assets/PlusIconWhite.png')} style={styles.addListIcon} />
        <Text style={styles.addListText}>ADD LIST</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  addListButton: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    width: addButtonWidth,
    transform: [{ translateX: '-50%' }],
    backgroundColor: Colours.ForeColour,
    padding: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  addListIcon: {
    flexShrink: 0,
    maxHeight: '100%',
    resizeMode: 'contain',
    height: addIconHeight,
    tintColor: Colours.ForeText,
  },

  addListText: {
    color: Colours.ForeText,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
