import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from "react-native";
import { Pressable } from 'react-native';

// My imports
// Assets
import * as Colours from '../assets/colours';
import * as Icons from '../assets/icons';

// Components
import PointsBubble from "./PointsBubble";

// *******************************
//            COMPONENT
// *******************************
const ItemCard = ({ onPress, thumbnail, text, points }) => {
  // ---React STATE Handling---
  const [touched, setTouched] = useState(false);

  return (
    <Pressable style={[styles.container, touched && styles.containerTouched]} onPress={onPress}
      onPressIn={() => setTouched(true)} 
      onPressOut={() => setTouched(false)}>
      {thumbnail != null && <Image source={thumbnail} style={styles.thumbnail} />}
      <Text style={[styles.text, touched && styles.textTouched]}>{text}</Text>
      {points != null &&       
      <View style={{ marginLeft: 'auto' }}>
        <PointsBubble points={points} />
      </View>}
    </Pressable>
  );
};

// *******************************
//            STYLES
// *******************************
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'flex-start',
    backgroundColor: Colours.BackColourOffset,
    borderRadius: 30,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },

  containerTouched: {
    backgroundColor: Colours.ForeColour,
    opacity: 0.8,
  },

  thumbnail: {
    height: 30,
    width: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },

  text: {
    color: Colours.BackText,
    fontFamily: 'Urbanist',
    fontSize: 14,
    fontWeight: 'bold',
  },

  textTouched: {
    color: Colours.ForeText,
  }
});

export default ItemCard;
