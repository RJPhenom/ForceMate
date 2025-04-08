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
import ModalMenu from '../components/ModalMenu';

// CONSTS
const addIconHeight = Platform.OS === 'web' ? 20 : '80%';
const addButtonWidth = Platform.OS === 'web' ? 200 : '50%';
const textEntry = "Enter list title...";

/// Validates that the input string is a valid (non-null and non-duplicate) list title
const validateListTitle = (inTitle) => {
  // Checks for null-y values
  if (!inTitle?.trim() || inTitle === textEntry)  { return false; }
  
  // Checks for duplicates
  const listExists = true//ListData.lists.some(list => list.name === inTitle);
  if (listExists) { return false; }

  // Passed
  return true;
}

/// Creates a new list JSON object, after validating the title input.
/// If list title is valid, create a new json list object taking in the title and
/// faction, but leaving the unit list initialized empty.
const createList = (inTitle, inFaction) => {
  // If the input is valid, create the list
  if (validateListTitle(inTitle)) {
    const newList = {
      name: inTitle,
      faction: inFaction,
      units: []
    };
  }

  // If list title isn't valid, raise an alert and return (exit func)
  else {
    alert('Invalid List Title');
    return;
  }
}

// *******************************
//            PAGE
// *******************************
export default function Home({ navigation }) {
  // ---React STATE Handling---
  const [modalAddList, setModalAddList] = useState(false);
  const [titleInput, setTitleInput] = useState(textEntry || "");
  const openModalAddList = () => setModalAddList(true);
  const closeModalAddList = () => setModalAddList(false);

  return (
    <View style={styles.container}>

      {/* ------------------CONTENT------------------ */}
      {/* Rows (ending with Add List Row Card) */}
      <RowCard onPress={openModalAddList} thumbnail={Icons.SmallPlusIconBlack} text='Add New List...' />

      {/* Bubble Add List Button */}
      <TouchableOpacity style={styles.addListButton} onPress={openModalAddList}>
        <Image source={require('../assets/PlusIconWhite.png')} style={styles.addListIcon} />
        <Text style={styles.addListText}>ADD LIST</Text>
      </TouchableOpacity>
      
      {/* ------------------MODAL WINDOW------------------ */}
      <ModalMenu
        isVisible={modalAddList}
        onClose={closeModalAddList}
        title="ADD LIST"
        textEntry={textEntry}
        titleInput={titleInput}
        setTitleInput={setTitleInput}
        items={[
          {
            thumbnail: require('../data/thumbnails/tau.png'),
            text: "T'AU EMPIRE",
            onPress: () => createList(titleInput, "tau"),
          },
          {
            thumbnail: require('../data/thumbnails/orks.png'),
            text: "ORKS",
            onPress: () => createList(titleInput, "orks"),
          },
        ]}
      />
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
