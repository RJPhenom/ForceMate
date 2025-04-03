import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';

// My imports
import * as Colours from '../assets/colours'

//CONSTS
var pointsTrackerWidth = Platform.OS === 'web' ? 200 : '50%';

export default function List({ navigation }) {
	// VARS
	var maxPoints = 1000;
	var currPoints = 500;

	return (
	<View style={styles.container}>
		<TouchableOpacity style={styles.pointsTracker}>
		<Text style={styles.pointsTrackerText}>{currPoints} / {maxPoints}</Text>
		</TouchableOpacity>
	</View>
	);
}

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
