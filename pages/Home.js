import React, { useState } from 'react';
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// My imports
// Assets
import * as Colours from '../assets/colours';
import * as Icons from '../assets/icons';

// Components
import RowCard from '../components/RowCard';
import ModalMenu from '../components/ModalMenu';

// Data
import Data from '../data/wh40k10e.json';
import Thumbnails from '../data/thumbnails';
import ListData from '../data/lists.json';

// *******************************
//               JS
// *******************************
// CONSTS
const addIconHeight = Platform.OS === 'web' ? 20 : '80%';
const addButtonWidth = Platform.OS === 'web' ? 200 : '50%';
const textEntry = "Enter list title...";

// Validates that the input string is a valid (non-null and non-duplicate) list title
const validateListTitle = (inTitle) => {
  // Checks for null-y values
  if (!inTitle?.trim() || inTitle === textEntry)  { return false; }
  
  // Checks for duplicates
  const listExists = ListData.lists.some(list => list.name === inTitle);
  if (listExists) { return false; }

  // Passed
  return true;
}

// Creates a new list JSON object, after validating the title input.
// If list title is valid, create a new json list object taking in the title and
// faction, but leaving the unit list initialized empty.
const createList = async (inTitle, inFaction, inCategories, navigation, closeWindow, addList) => {
  // We need to clean the categories to show current state is empty
  inCategories = inCategories.map(category => {
    return {
      ...category,
      units: [], // Initialize empty unit list
    };
  });

  // If the input is valid, create the list
  if (validateListTitle(inTitle)) {
    const newList = {
      name: inTitle,
      faction: inFaction,
      categories: inCategories,
      battle_size: 1000,
    };

    closeWindow();
    addList(newList);
    navigateToList(newList, navigation);
  }

  // If list title isn't valid, raise an alert and return (exit func)
  else {
    alert('Invalid List Title');
    return;
  }
}

// Navigates to a selected list
const navigateToList = (list, navigation) => {
  navigation.navigate('List', { list: list });
}

// *******************************
//            PAGE
// *******************************
export default function Home({ navigation, lists, setLists, menuPressed }) {
  // ---React STATE Handling---
  const [modalAddList, setModalAddList] = useState(false);
  const openModalAddList = () => setModalAddList(true);
  const closeModalAddList = () => setModalAddList(false);

  const addList = (newList) => {
    const newLists = [...lists, newList];
    setLists(newLists);
  };

  const [titleInput, setTitleInput] = useState("");
  
  // Event Handler for deleting lists
  const handleDelete = (indexToDelete) => {
    const updatedSelection = [...lists];
    updatedSelection.splice(indexToDelete, 1);
    setLists(updatedSelection);
  };

  //---DATA Handling---
  // Get the list of factions from the data file
  const items = Data.factions.map((faction) => ({
    thumbnail: Thumbnails[faction.thumbnail],
    text: faction.name.toUpperCase(),
    onPress: () => { createList(titleInput, faction.id, faction.categories, navigation, closeModalAddList, addList); menuPressed(false); },
  }));

  return (
    <View style={{ flex: 1 }}>
      {/* ------------------CONTENT------------------ */}
      <ScrollView style={styles.container}>
        {/* Foreach loop over all selectable lists found in the JSON */}
        {lists.map((list, index) => (
          <RowCard
            key={index}
            onPress={() => { menuPressed(false); navigateToList(list, navigation)}}
            thumbnail={Thumbnails[Data.factions.find(faction => faction.id === list.faction).thumbnail]}
            text={list.name}
            points={list.battle_size}
            removable={true}
            onDelete={() => handleDelete(index)}
          />
        ))}

        {/* Rows end with an Add List Row Card) */}
        <RowCard onPress={() => {openModalAddList(); menuPressed(false)}} thumbnail={Icons.SmallPlusIconBlack} text='Add New List...' italic={true} removable={false}/>
      </ScrollView>

      {/* ------------------ADD LIST BUBBLE BUTTON------------------ */}
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
        items={items}
      />
    </View>
  );
}

// *******************************
//            STYLES
// *******************************
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
    fontFamily: 'Urbanist',
  },
});
