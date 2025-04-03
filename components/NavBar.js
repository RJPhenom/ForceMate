import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { Platform } from 'react-native';

// My imports
import * as Colours from '../assets/colours';

// Pages
import Home from '../pages/Home';

// VARS
const navHeight = 40;
const mobilePadding = Platform.OS === 'web' ? 0 : 40;

// *******************************
//              JS
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
            <Image source={require('../assets/BurgerIcon.png')} style={[styles.flexIcon, {height: '65%'}, { tintColor: menuPressed ? Colours.fmBlue : Colours.fmWhite }]} resizeMode='contain'/>

          </TouchableOpacity>
          )}

          
          {/* WEB: Show menu items directly */}
          {isWeb && (
            <View style={styles.webMenuContainer}>
              <TouchableOpacity style={styles.webMenuItem} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.webMenuText}>Home</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Centered ForceMate Logo */}
          <Image source={require('../assets/fmLogo.png')} style={styles.logo} resizeMode="contain" />

        </View>

        {/* DROPDOWN MENU - MOBILE ONLY */}
        {menuPressed && !isWeb && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
              <Image source={require('../assets/HomeIcon.png')} style={[styles.flexIcon, {height: '50%', alignSelf: 'center'}, { tintColor: menuPressed ? Colours.fmBlack : Colours.fmOffwhite }]} resizeMode='contain' />
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
    backgroundColor: Colours.fmBlue,
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
    backgroundColor: Colours.fmBlue,
  },

  burgerButtonPressed: {
    backgroundColor: Colours.fmWhite,
  },

  flexIcon: {
    flexShrink: 1,
    maxHeight: '100%',
  },

  // Justify the ForceMate logo
  logo: {
    alignSelf: 'center',
  },

  // Dropdown nav menu styles
  container: {
    backgroundColor: Colours.fmBlue,
      paddingTop: mobilePadding, // Padding for mobile menus at phone screen top
    zIndex: 100, // This only works if the dropdown is at front of z order, I'm not sure why
  },

  dropdownMenu: {
    position: 'absolute',
    top: navHeight + mobilePadding, // Below navbar
    left: 0,
    backgroundColor: Colours.fmWhite,
    alignContent: 'stretch',
  },

  menuItem: {
    height: navHeight,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: Colours.fmOffwhite,
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
    color: Colours.fmBlack,
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
    color: Colours.fmWhite,
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