import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback } from 'react-native';

// My imports
// Assets
import * as Colours from './assets/colours';

// Components
import NavBar from './components/NavBar';

// Pages
import Home from './pages/Home';
import List from './pages/List';

// *******************************
//               JS
// *******************************
// CONSTS
const Stack = createStackNavigator();

export default function App() {
  const [menuPressed, setMenuPressed] = useState(false);
  
  return (
    <TouchableWithoutFeedback onPress={() => setMenuPressed(false)} accessible={false}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home">
              {(props) => (
                <>
                <NavBar menuPressed={menuPressed} setMenuPressed={setMenuPressed} navigation={props.navigation}/>
                <Home {...props} setMenuPressed={setMenuPressed} />
                </>
              )}
            </Stack.Screen>
            <Stack.Screen name="List">
              {(props) => (
                <>
                <NavBar menuPressed={menuPressed} setMenuPressed={setMenuPressed} navigation={props.navigation}/>
                <List {...props} setMenuPressed={setMenuPressed} />
                </>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.BackColour,
  },
});