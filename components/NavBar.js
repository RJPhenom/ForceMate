import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Platform } from 'react-native';

// My imports
// Assets
import * as Colours from '../assets/colours';
import * as Icons from '../assets/icons';

// Pages
import Home from '../pages/Home';

// VARS
const navHeight = 60;
const mobilePadding = Platform.OS === 'web' ? 0 : 40;

// *******************************
//            COMPONENT
// *******************************
const NavBar = ({ menuPressed, setMenuPressed, navigation }) => {
  /* 
    We build the submenu as a TouchableWithoutFeedback to get simple toggle functions, the GUI button function
    is in the nested TouchableOpacity. I built this with StackOverflow, ChatGPT (not merely copy-pasta), and React 
    Native docs: https://reactnative.dev/docs/touchablewithoutfeedback 
  */

  const isWeb = Platform.OS === 'web';
  return (
    <TouchableWithoutFeedback onPress={() => setMenuPressed(false)}>
      <View style={styles.container}>

        {/* Navbar container (just a view with styling) */}
        <View style={[styles.navbar, menuPressed && styles.navbarPressed]}>

          {/* MOBILE: Burger Menu Container [Touchable Opcatiy] source: https://reactnative.dev/docs/touchableopacity */}
          {!isWeb && (
          <TouchableOpacity
            style={[styles.burgerButton, menuPressed && styles.burgerButtonPressed]}
            onPress={() => setMenuPressed(!menuPressed)}
          >

            {/* The actual burger menu icon, which is a png that sits in the container and changes colour */}
            <Image source={Icons.BurgerIconWhite} style={[styles.flexIcon, {height: '45%'}, { tintColor: menuPressed ? Colours.fmBlue : Colours.fmWhite }]} />

          </TouchableOpacity>
          )}

          
          {/* WEB: Show menu items directly */}
          {isWeb && (
            <View style={styles.webMenuContainer}>
              <TouchableOpacity style={styles.webMenuItem} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.webMenuText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.webMenuItem} onPress={() => navigation.navigate('List')}>
                <Text style={styles.webMenuText}>List</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Centered ForceMate Logo */}
          <Image source={Icons.ForceMateLogo} style={styles.logo} resizeMode="contain" />

        </View>

        {/* DROPDOWN MENU - MOBILE ONLY */}
        {menuPressed && !isWeb && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
              <Image source={Icons.HomeIconBlack} style={[styles.flexIcon, {height: '50%', alignSelf: 'center'}, { tintColor: menuPressed ? Colours.fmBlack : Colours.fmOffwhite }]} />
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

// *******************************
//            STYLES
// *******************************
const styles = StyleSheet.create({
  navbar: {
    height: navHeight,
    backgroundColor: Colours.ForeColour,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Colour swap the burger button [touchable opacity] on press
  burgerButton: {
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    left: 0, // Forces left align
    backgroundColor: Colours.ForeColour,
  },

  burgerButtonPressed: {
    backgroundColor: Colours.ForeText,
  },

  flexIcon: {
    flexShrink: 1,
    maxHeight: '100%',
    resizeMode: 'contain',
  },

  // Justify the ForceMate logo
  logo: {
    alignSelf: 'center',
  },

  // Dropdown nav menu styles
  container: {
    backgroundColor: Colours.ForeColour,
      paddingTop: mobilePadding, // Padding for mobile menus at phone screen top
    zIndex: 100, // This only works if the dropdown is at front of z order, I'm not sure why
  },

  dropdownMenu: {
    position: 'absolute',
    top: navHeight + mobilePadding, // Below navbar
    left: 0,
    backgroundColor: Colours.BackColour,
    alignContent: 'stretch',
  },

  menuItem: {
    height: navHeight,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: Colours.BackColourOffset,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  menuText: {
    maxHeight: '100%',
    alignSelf: 'center',
    fontFamily: 'Urbanist',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 15,
    color: Colours.BackText,
  },

  webMenuItem: {
    height: navHeight,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'center',
  },

  webMenuText: {
    maxHeight: '100%',
    alignSelf: 'center',
    fontFamily: 'Urbanist',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 15,
    color: Colours.ForeText,
  },

  webMenuContainer: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    height: '100%',
    alignItems: 'center',
  },
});

export default NavBar;