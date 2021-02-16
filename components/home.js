import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Title } from "react-native-paper";
import { Styles } from "./utils";

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
      <View style={Styles.translatedTextBottom}>
        <TouchableOpacity onPress={() => navigation.navigate("Translate Text")}>
          <View style={Styles.navButton}>
            <MaterialCommunityIcons
              backgroundColor="#fff"
              name="translate"
              size={50}
              color="black"
            />
            <Title>Text</Title>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Camera Options")}>
          <View style={Styles.navButton}>
            <Feather name="camera" size={50} color="black" />
            <Title>Camera</Title>
          </View>
        </TouchableOpacity>
      </View>
      <View style={Styles.translatedTextBottom}>
        <TouchableOpacity onPress={() => navigation.navigate("Recents")}>
          <View style={Styles.navButton}>
            <Feather name="folder" size={50} color="black" />
            <Title>Recents</Title>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Flashcards")}>
          <View style={Styles.navButton}>
            <MaterialCommunityIcons
              name="cards-outline"
              size={50}
              color="black"
            />
            <Title>Flashcards</Title>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <View style={Styles.homeSettingsButton}>
          <Feather name="settings" size={50} color="grey" />
          <Title style={{ color: "grey" }}>Settings</Title>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default Home;
