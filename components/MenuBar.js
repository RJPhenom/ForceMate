import React from "react";
import { TouchableOpacity } from "react-native";

export default function MenuBar ({}) {
    return (
        <View style={styles.menuBar}>
          <Text style={styles.menuText}>ForceMate</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    Bar: {
      height: 60,
      backgroundColor: '#ADD8E6',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Platform.OS !== 'web' ? 10 : 0,
      paddingHorizontal: 15,
    },

    menuText: {
      fontSize: 20,
      color: 'white',
      fontFamily: 'Urbanist',
    },

  });