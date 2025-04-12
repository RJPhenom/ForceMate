import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback } from 'react-native';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';


// My imports
// Assets
import * as Colours from './assets/colours';

// Components
import NavBar from './components/NavBar';

// Pages
import Home from './pages/Home';
import List from './pages/List';

// Data
import ListData from './data/lists.json';

// *******************************
//               JS
// *******************************
// CONSTS
const Stack = createStackNavigator();

export default function App() {
  const [selectableLists, setSelectableLists] = useState(ListData.lists || []);
  const [menuPressed, setMenuPressed] = useState(false);
  const [fontsLoaded] = useFonts({
    Urbanist: require('./assets/fonts/Urbanist-VariableFont_wght.ttf'),
    UrbanistItalic: require('./assets/fonts/Urbanist-Italic-VariableFont_wght.ttf'),
  });
  
  return (
    <TouchableWithoutFeedback onPress={() => setMenuPressed(false)} accessible={false}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home">
              {(props) => (
                <>
                <NavBar menuPressed={menuPressed} setMenuPressed={setMenuPressed} navigation={props.navigation}/>
                <Home {...props} lists={selectableLists} setLists={setSelectableLists} menuPressed={setMenuPressed} />
                </>
              )}
            </Stack.Screen>
            <Stack.Screen name="List">
              {(props) => (
                <>
                <NavBar menuPressed={menuPressed} setMenuPressed={setMenuPressed} navigation={props.navigation}/>
                <List {...props} lists={selectableLists} setLists={setSelectableLists} menuPressed={setMenuPressed} />
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