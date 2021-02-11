import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GoToButton } from "../components/utils";

function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Feather
        name="camera"
        size={50}
        color="black"
        onPress={() => navigation.navigate("CameraOptions")}
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
