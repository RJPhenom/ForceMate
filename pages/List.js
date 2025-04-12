import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';

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
import CategoryCard from '../components/CategoryCard';

// *******************************
//               JS
// *******************************
// CONSTS
var pointsTrackerWidth = Platform.OS === 'web' ? 200 : '50%';

// Gets a faction object from JSON using the ID param
const getFaction = (id) => {
	return Data.factions.find(faction => faction.id === id);
}

// Looks up the faction name and thumbnail to output to the navigator
const getFactionConfig = (id, maxPoints, editBattleSize) => {
	const faction = getFaction(id);
	return [
		{ "thumbnail" : Thumbnails[faction.thumbnail], "name": faction.name, "removable" : false, "onPress" : () => {} }, 
		{ "thumbnail" : Icons.SmallEditIconBlack, "name" : "Battle Size", "points": maxPoints, "removable": false, "onPress": editBattleSize},
	];
}

// Gets a unit by ID in the data JSON
const getUnit = (id) => {
	// Lookup the unit object in the faction JSON
	return Data.units.find(unit => unit.id === id);
}

// Return the units that a faction can select from within a category
const getStaticCategoryUnits = (factionID, categoryID) => {
	return Data.factions.find(staticFaction => staticFaction.id === factionID).categories.find(staticCategory => staticCategory.id === categoryID).units;
}

// Returns the built unit list for the category, which stores IDs only
const getCategoryUnits = (category) => {
	// Map makes an array like a foreach loop
	return category.units.map(id => {
		const unit = getUnit(id);

		// Need to fetch the thumbnail path using key stored in JSON
		return {
		  ...unit,
		  thumbnail: Thumbnails[unit.thumbnail] || null
		};
	});
}

// Loops through stored units in the category containers of the list JSON 
// and sums them, producing the initial current points value when the list is loaded
const getInitPoints = (categories) => {
	points = 0;
	categories.forEach(category => {
		category.units.forEach(unit => {
			points += getUnit(unit).points;
		});
	});

	return points;
}

// *******************************
//               PAGE
// *******************************
export default function List({ navigation, route, lists, setLists, menuPressed }) {
	// ---React STATE Handling---
	const [modalBattleSizeEditor, setModalBattleSizeEditor] = useState(false);
	const openBattleSizeEditor = () => setModalBattleSizeEditor(true);
	const closeBattleSizeEditor = () => setModalBattleSizeEditor(false);

	//---DATA Handling---
	// ---Retrieve DATA from Params---
	const { list } = route.params;
	const categories = list.categories;
	const faction = getFaction(list.faction);

	// Points tracking
	const [maxPoints, setMaxPoints] = useState(list.battle_size || 0);
	const [currPoints, setCurrPoints] = useState(getInitPoints(categories) || 0);
	const incrementCurrPoints = (points) => {setCurrPoints(currPoints + points);}
	const incrementMaxPoints = (points) => {setMaxPoints(maxPoints + points);}

	// Baltte size points tracking
	const [config, setConfig] = useState(getFactionConfig(faction.id, maxPoints, openBattleSizeEditor));
	useEffect(() => {
		setConfig(getFactionConfig(faction.id, maxPoints, openBattleSizeEditor));
	}, [maxPoints]);

	// Get the list of factions from the data file
	const items = Data.battlesizes.map((size) => ({
		text: size.name.toUpperCase(),
		points: size.points,
		onPress: () => { 
			setMaxPoints(size.points); 
			closeBattleSizeEditor(); 
		},
	}));

	return (
	<View style={{ flex: 1 }}>
		{/* ------------------CONTENT------------------ */}
		<ScrollView style={styles.container}>
			{/* First row is always the configuration category, with details passed to the list page */}
			<CategoryCard name = 'Configuration' unitsInList={config} addable={false} pointsTrackingContainer={incrementMaxPoints} menuPressed={menuPressed}/>

			{/* Foreach loop over all categories passed in. */}
			{categories.map((category, index) => (
				<CategoryCard
					key={index}
					name={category.name}
					units={getStaticCategoryUnits(faction.id, category.id)}
					addable={true}
					unitsInList={getCategoryUnits(category)}
					pointsTrackingContainer={incrementCurrPoints}
					menuPressed={menuPressed}
					list={list}
					lists={lists}
					setLists={setLists}
					onPress={() => {}}
				/>
			))}
		</ScrollView>

		{/* ------------------POINTS TRACKER------------------ */}
		<TouchableOpacity style={styles.pointsTracker} onPress={() => {menuPressed(false);}}>
			<Text style={styles.pointsTrackerText}>{currPoints} / {maxPoints}</Text>
		</TouchableOpacity>

		{/* ------------------MODAL WINDOW------------------ */}
		<ModalMenu
			isVisible={modalBattleSizeEditor}
			onClose={closeBattleSizeEditor}
			title="BATTLE SIZE"
			items={items}
		/>
	</View>
	);
}

// *******************************
//             STYLES
// *******************************
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},

	pointsTracker: {
		position: 'absolute',
		bottom: 50,
		left: '50%',
		width: pointsTrackerWidth,
		transform: [{ translateX: '-50%' }],
		backgroundColor: Colours.ForeColour,
		padding: 15,
		borderRadius: 30,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},

	pointsTrackerText: {
		color: Colours.ForeText,
		fontSize: 24,
		fontWeight: 'bold',
	},
});
