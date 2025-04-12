import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { TextInput } from "react-native";
import { Modal } from "react-native";

// My imports
// Assets
import * as Colours from '../assets/colours';
import * as Icons from '../assets/icons';

// Components
import ItemCard from "./ItemCard";

// *******************************
//            COMPONENT
// *******************************
// Built using https://reactnative.dev/docs/modal docs for react
// modal windows.
const ModalMenu = ({ isVisible, onClose, title, subtitle, textEntry, items, titleInput, setTitleInput }) => {
  // Split the title for brand colouring on the leftmost space char
  const titleWords = [title.slice(0, title.indexOf(' ')), title.slice(title.indexOf(' ') + 1)];

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>

        <View style={styles.container}>

          {/* ------------------HEADER------------------ */}
          <View style={styles.header}>

            {/* Cancel button */}
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Image source={Icons.SmallCancelIconWhite} style={styles.closeIcon} />
            </Pressable>

            {/* Title (split for diff text colours) */}
            <View style={styles.titleRow}>
              <Text style={styles.titleLeft}>{titleWords[0]}</Text><Text> </Text><Text style={styles.titleRight}>{titleWords[1]}</Text>
            </View>      

            {/* Subtitle (text input or plain label) */}
            {/* Only show text input if textEntry is not null */}
            {textEntry != null && (
              <View style={styles.entryRow}>
                <TextInput
                  style={styles.entryText}
                  value={titleInput} // Default value for the TextInput
                  placeholder={textEntry} // Placeholder text
                  placeholderTextColor={'gray'} // Make it visible (very faded colour by default)
                  onChangeText={(newText) => setTitleInput(newText)} // Update the state when text changes
                />               
                <Image source={Icons.SmallEditIconWhite} style={styles.editIcon} />
              </View>
            )}

            {/* Only show subtitle if there is not text input and subtitle has text provided */}
            {textEntry == null && (subtitle != null) && (
              <Text style={styles.subtitle}>{subtitle}</Text>
            )}

          </View>

          {/* ------------------BODY------------------ */}
          <View style={styles.body}>

            {/* Build RowCards from the items */}
            {items.map((item, index) => (
              <ItemCard key={index} {...item} />
            ))}

          </View>

            {/* ------------------FOOTER------------------ */}
            {/* TODO */}

        </View>
        
      </View>
    </Modal>
    
  );
};

// *******************************
//            STYLES
// *******************************
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darkens the background
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    minWidth: '100%',
  },

  container: {
    borderRadius: 30,
    padding: 10,
    minHeight: 120,
    minWidth: 360,
  },

  header: {
    backgroundColor: Colours.ForeColour,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 10,
    minHeight: '10%',
    minWidth: '100%',
  },

  cancelButton: {
    height: 30,
    width: 30,
  },

  entryRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
  },

  entryText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black',
    backgroundColor: Colours.BackColour,
    borderRadius: 30,
    padding: 10,
    fontFamily: 'Urbanist',
    fontSize: 16,
    minWidth: '60%',
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleLeft: {
    alignSelf: 'center',
    paddingBottom: 15,
    color: Colours.ForeText,
    fontWeight: 'bold',
    fontFamily: 'Urbanist',
    fontSize: 16,
  },

  titleRight: {
    alignSelf: 'center',
    paddingBottom: 15,
    color: Colours.BrandColour,
    fontWeight: 'bold',
    fontFamily: 'Urbanist',
    fontSize: 16,
  },

  subtitle: {
    textAlign: 'center',
    alignSelf: 'center',
    color: Colours.ForeText,
    fontFamily: 'Urbanist',
    fontSize: 14,
  },

  editIcon: {
    maxHeight: 30,
    maxWidth: 30,
    resizeMode: 'contain',
  },

  body: {
    backgroundColor: Colours.BackColour,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    padding: 10,
    minWidth: '100%',
    alignItems: 'center',
  },

  bodyText: {
    color: Colours.BackText,
    fontFamily: 'Urbanist',
    fontSize: 14,
  }
});

export default ModalMenu;
