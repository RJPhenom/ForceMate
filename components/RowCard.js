import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from 'react-native';

// My imports
// Assets
import * as Colours from '../assets/colours';
import * as Icons from '../assets/icons';

// Components
import PointsBubble from "./PointsBubble";

// *******************************
//            COMPONENT
// *******************************
const RowCard = ({ onPress, thumbnail, text, points }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {thumbnail != null && <Image source={thumbnail} style={styles.thumbnail} />}
      <Text style={[styles.text, { fontStyle: 'italic' }]}>{text}</Text>
      {points != null && <PointsBubble points={points} />}
    </TouchableOpacity>
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
    backgroundColor: Colours.BackColour,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colours.BackColourOffset,
    width: '100%',
  },

  thumbnail: {
    height: 30,
    width: 30,
    marginRight: 10,
    tintColor: Colours.BackText,
  },

  text: {
    color: Colours.BackText,
    fontFamily: 'Urbanist',
    fontSize: 14,
  },
});

export default RowCard;
