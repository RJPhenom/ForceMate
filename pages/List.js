import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';

// My imports
// Assets
import * as Colours from '../assets/colours'

// Components
import RowCard from '../components/RowCard';

// Data
import Data from '../data/wh40k10e.json';
import Thumbnails from '../data/thumbnails';

// *******************************
//               JS
// *******************************
// CONSTS
var pointsTrackerWidth = Platform.OS === 'web' ? 200 : '50%';

// VARS
var maxPoints = 1000;
var currPoints = 500;

const getFaction = (id) => {
	return Data.factions.find(faction => faction.id === id);
}

// *******************************
//               PAGE
// *******************************
export default function List({ navigation, route }) {
	// ---Retrieve DATA from Params---
	const { list } = route.params;
	const faction = getFaction(list.faction);

	return (
	<View style={styles.container}>

		{/* ------------------CONTENT------------------ */}
		{/* Rows (ending with Add List Row Card) */}
		<RowCard onPress={() => {}} thumbnail={Thumbnails[list.faction]} text={faction.name} />

		<TouchableOpacity style={styles.pointsTracker}>
		<Text style={styles.pointsTrackerText}>{currPoints} / {maxPoints}</Text>
		</TouchableOpacity>
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
