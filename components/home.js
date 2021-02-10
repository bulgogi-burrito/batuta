import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GoToButton } from "../components/utils";

function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Feather
        name="camera"
        size={75}
        color="black"
        onPress={() => navigation.navigate("CameraOptions")}
      />
      {/* <GoToButton screenName="Microphone" /> */}
      <Feather
        name="folder"
        size={75}
        color="black"
        onPress={() => navigation.navigate("Recents")}
      />
      <Feather
        name="settings"
        size={75}
        color="black"
        onPress={() => navigation.navigate("Settings")}
      />
      <GoToButton screenName="Flashcards" />
      <GoToButton screenName="Translate Text" />
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
