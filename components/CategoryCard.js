import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from 'react-native';

// My imports
// Assets
import * as Colours from '../assets/colours';
import * as Icons from '../assets/icons';

// Components
import PointsBubble from "./PointsBubble";
import ModalMenu from "./ModalMenu";
import RowCard from "./RowCard";

// Data
import Data from '../data/wh40k10e.json';
import Thumbnails from '../data/thumbnails';

// Gets all the units in the data JSON that are in the passed in
// array of unit IDs. Returns an array of objects with the unit's thumbnail, name, and points.
const getUnitCards = (units, onClickHandler) => {
  // Declare return array
  const returnedUnits = [];

  // Iterate over IDs passed in, look them up and return the built object.
  for (let i = 0; i < units.length; i++) {
    const unit = Data.units.find(unit => unit.id === units[i]);
    if (unit) {
      returnedUnits.push({
        thumbnail: Thumbnails[unit.thumbnail],
        text: unit.name.toUpperCase(),
        points: unit.points,
        onPress: () => {
          onClickHandler(unit)
        }
      });
    }
  }

  return returnedUnits;
}

// *******************************
//            COMPONENT
// *******************************
const CategoryCard = ({ name, points, units, addable, unitsInList, pointsTrackingContainer, menuPressed, list, lists, setLists }) => {
  // ---React STATE Handling---
  // Collapsed/expanded area
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapse = () => { setCollapsed(!collapsed);  };

  // Modal add unit window
  const [modalAddList, setModalAddList] = useState(false);
  const openModalAddList = () => setModalAddList(true);
  const closeModalAddList = () => setModalAddList(false);

  // Unit Selections
  const [CurrentUnitSelection, setCurrentUnitSelection] = useState(unitsInList || []);
  const addUnit = (newUnit) => {
    // Grab the thumbnail path from the JSON dict
    const unitToAdd = {
		  ...newUnit,
		  thumbnail: Thumbnails[newUnit.thumbnail] || null
		};

    // Create the updated array and set local
    const updatedSelection = [...CurrentUnitSelection, unitToAdd];
    setCurrentUnitSelection(updatedSelection);

    // Update global lists to reflect local change
    const updatedLists = [...lists];
    const updatedList = updatedLists.find(storedLists => list.name === storedLists.name);
    const updatedCategory = updatedList.categories.find(category => category.name === name);
    updatedCategory.units.push(newUnit.id);

    setLists(updatedLists);

    pointsTrackingContainer(unitToAdd.points);
  };

  // Sync parent pushes of new unit lists to local state, this is used primarily for
  // the list modal Battle Size editor to push changes to the config card
  useEffect(() => {
    setCurrentUnitSelection(unitsInList || []);
  }, [unitsInList]);

  // ---EVENT HANDLERS---
  // Event handler (for the actual button click on the rowcards generated in the modal add window)
  const handleUnitClick = (unit) => {
    addUnit(unit);
    pointsTrackingContainer(unit.points);
    closeModalAddList();
  }

  // Event Handler for deleting rows from categories
  const handleDelete = (indexToDelete) => {
    const updatedSelection = [...CurrentUnitSelection];
    updatedSelection.splice(indexToDelete, 1);
    pointsTrackingContainer(CurrentUnitSelection[indexToDelete].points * -1);
    setCurrentUnitSelection(updatedSelection);

    // Update global lists to reflect local change
    const updatedLists = [...lists];
    const updatedList = updatedLists.find(storedLists => list.name === storedLists.name);
    const updatedCategory = updatedList.categories.find(category => category.name === name);
    updatedCategory.units.splice(indexToDelete, 1);

    setLists(updatedLists);
  };

  return (
    <View>
      {/* ------------------HEADER------------------ */}
      <TouchableOpacity style={styles.container} onPress={() => {toggleCollapse(), menuPressed(false);}}>
        <Image source={Icons.SmallExpandIconBlack} style={styles.thumbnail} />
        <Text style={styles.text}>{name.toUpperCase()}</Text>
        {points != null && <PointsBubble points={points} />}
      </TouchableOpacity>

      {/* ------------------CONTENT------------------ */}
      {!collapsed && (
        <View>
          {/* Foreach loop over all units passed in. */}
          {CurrentUnitSelection.map((unit, index) => (
            <RowCard
              key={index}
              onPress={() => {unit.onPress(); menuPressed(false);}}
              thumbnail={unit.thumbnail}
              text={unit.name}
              points={unit.points}
              removable={unit.removable}
              onDelete={() => handleDelete(index)}
            />
          ))}

          {/* If 'addable' end the row with an add unit row */}
          {addable && (
            <RowCard onPress={() => {openModalAddList(); menuPressed(false);}} thumbnail={Icons.SmallPlusIconBlack} text={'Add New ' + name + '...'} italic={true} removable={false}/>
          )}
        </View>
      )}

      {/* ------------------MODAL WINDOW------------------ */}
      {addable && (
        <ModalMenu
          isVisible={modalAddList}
          onClose={closeModalAddList}
          title={`ADD ${name.toUpperCase()}`}
          items={getUnitCards(units, handleUnitClick)}
        />
      )} 
    </View>
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
    
  },

  text: {
    color: Colours.BackText,
    fontFamily: 'Urbanist',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CategoryCard;
