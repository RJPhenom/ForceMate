import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from "react-native";
import { Pressable } from 'react-native';
import { Platform } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

// Edit configuration because documentation is not clear on how to enable
// shared value properly
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Turn off strict mdoe because documentation is not clear
});

// My imports
// Assets
import * as Colours from '../assets/colours';
import * as Icons from '../assets/icons';

// Components
import PointsBubble from "./PointsBubble";

// *******************************
//            COMPONENT
// *******************************
const RowCard = ({ onPress, thumbnail, text, points, italic = false, removable = true, onDelete}) => {
  // ---React STATE Handling---
  const [deleteHovered, setDeleteHovered] = useState(false);
  const [deletePressed, setDeletePressed] = useState(false);
  
  const isWeb = Platform.OS === 'web';

  // On web use a right-aligned delete button where applicable
  if (isWeb) {
    return (
      <View style={styles.rowContainer}>
        <Pressable style={styles.container} onPress={onPress}>
          {thumbnail != null && <Image source={thumbnail} style={[styles.thumbnail, {marginRight: 10}]} />}
          <Text style={[styles.text, { fontFamily: italic? 'UrbanistItalic' : 'Urbanist' }]}>{text}</Text>
          {points != null && <PointsBubble points={points} />}
        </Pressable>
  
        {/* Delete button (if applicable) */}
        {removable && (
          <Pressable style={[{padding: 10, alignSelf: 'flex-end', backgroundColor: deleteHovered ? 'red' : 'transparent'}]}
            onPress={() => {setDeletePressed(!deletePressed); onDelete();}}
            onHoverIn={() => setDeleteHovered(true)}
            onHoverOut={() => setDeleteHovered(false)}>
            <Image source={deleteHovered ? Icons.SmallDeleteIconWhite: Icons.SmallDeleteIconBlack} style={[styles.thumbnail]} />
          </Pressable>
        )}
      </View>
    );
  } 
  
  // On mobile use swipe delete from imported library
  else {
    const renderRightActions = () => {
      if (!removable) return null;
  
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', width: 50 }}>
          <Pressable
            style={{ padding: 10, alignSelf: 'flex-end', backgroundColor: 'red' }}
            onPress={() => {
              setDeletePressed(!deletePressed);
              onDelete();
            }}
          >
            <Image source={Icons.SmallDeleteIconWhite} style={[styles.thumbnail]} />
          </Pressable>
        </View>
      );
    };
  
    return (
      <View style={styles.swipeRowContainerDeletion}>
        <GestureHandlerRootView>
          <ReanimatedSwipeable
            renderRightActions={renderRightActions}
            rightThreshold={200}
            onSwipeableWillOpen={(direction) => {if (direction === 'right' && removable) {setDeletePressed(true)}}} // Visualize swipe deletion
            onSwipeableOpen={(direction) => {if (direction === 'right' && removable) {onDelete();}}} // Run deletion function
          >
            {/* Visible row */}
            <View style={deletePressed ? styles.swipeContentContainerDeletion : styles.swipeContentContainer}>
              <Pressable style={styles.container} onPress={onPress}>
                {thumbnail != null && <Image source={thumbnail} style={[styles.thumbnail, { marginRight: 10 }]} />}
                <Text style={[deletePressed ? styles.textDeletion : styles.text, { fontFamily: italic ? 'UrbanistItalic' : 'Urbanist' }]}>{text}</Text>
                {points != null && <PointsBubble points={points} />}
              </Pressable>
            </View>
          </ReanimatedSwipeable>
        </GestureHandlerRootView>
      </View>
    );
  }
};

// *******************************
//            STYLES
// *******************************
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colours.BackColourOffset,
    backgroundColor: Colours.BackColour,
  },

  swipeRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colours.BackColourOffset,
    backgroundColor: Colours.BackColour,
  },

  swipeRowContainerDeletion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colours.BackColourOffset,
    backgroundColor: 'red',
  },

  swipeContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: Colours.BackColour,
  },

  swipeContentContainerDeletion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'red',
  },

  container: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'flex-start',
    padding: 10,
  },

  thumbnail: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },

  text: {
    color: Colours.BackText,
    fontSize: 14,
  },

  textDeletion: {
    color: Colours.ForeText,
    fontSize: 14,
  },
});

export default RowCard;
