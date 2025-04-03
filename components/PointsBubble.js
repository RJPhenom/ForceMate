import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Platform } from "react-native";

// My imports
import * as Colours from '../assets/colours';

// CONSTS
const minWidth = Platform.OS === 'web' ? 60 : 30;

// *******************************
//            COMPONENT
// *******************************
const PointsBubble = ({ points }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{points}</Text>
    </View>
  );
};

// *******************************
//            STYLES
// *******************************
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.ForeColour,
    padding: 5,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: minWidth,
    marginLeft: 10,
  },

  text: {
    color: Colours.ForeText,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PointsBubble;
