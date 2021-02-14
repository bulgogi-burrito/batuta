import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

function Home() {
  const navigation = useNavigation();
  const [permissions, setPermissions] = React.useState(false);

  const askPermissionsAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
  };

  if (!permissions) {
    askPermissionsAsync();
  }
  return (
    <View style={styles.container}>
      <Feather
        name="camera"
        size={50}
        color="black"
        onPress={() => navigation.navigate("Camera Options")}
      />
      <MaterialCommunityIcons
        backgroundColor="#fff"
        name="translate"
        size={50}
        color="black"
        onPress={() => navigation.navigate("Translate Text")}
      />
      <Feather
        name="folder"
        size={50}
        color="black"
        onPress={() => navigation.navigate("Recents")}
      />
      <MaterialCommunityIcons
        name="cards-outline"
        size={50}
        color="black"
        onPress={() => navigation.navigate("Flashcards")}
      />
      <Feather
        name="settings"
        size={50}
        color="black"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default Home;
