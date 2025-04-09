import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from 'react-native';

// My imports
// Assets
import * as Colours from '../assets/colours';
import * as Icons from '../assets/icons';

// Components
import PointsBubble from "./PointsBubble";
import RowCard from "./RowCard";

// *******************************
//            COMPONENT
// *******************************
const CategoryCard = ({ name, points, units, addable }) => {
  // ---React STATE Handling---
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapse = () => { setCollapsed(!collapsed);  };

  return (
    <View>
      {/* ------------------HEADER------------------ */}
      <TouchableOpacity style={styles.container} onPress={toggleCollapse()}>
        {thumbnail != null && <Image source={thumbnail} style={styles.thumbnail} />}
        <Text style={[styles.text, { fontStyle: 'italic' }]}>{name}</Text>
        {points != null && <PointsBubble points={points} />}
      </TouchableOpacity>

      {/* ------------------CONTENT------------------ */}
      {!collapsed && (
        <View>
          {/* Foreach loop over all units passed in. */}
          {units.map((unit, index) => (
            <RowCard
              key={index}
              onPress={() => {}}
              thumbnail={unit.thumbnail}
              text={unit.name}
            />
          ))}

          {/* If 'addable' end the row with an add unit row */}
          {addable && (
            <RowCard onPress={openModalAddList} thumbnail={Icons.SmallPlusIconBlack} text={'Add New ' + name + '...'} />
          )}
        </View>
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
