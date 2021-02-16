import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Title } from "react-native-paper";
import { Styles } from "./utils";

function CameraOptions() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <View style={Styles.cameraOptionsButton}>
          <MaterialCommunityIcons
            backgroundColor="#fff"
            name="translate"
            size={75}
            color="black"
          />
          <Title>Text Detection</Title>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ObjectCamera")}>
        <View style={Styles.cameraOptionsButton}>
          <Foundation
            backgroundColor="#fff"
            name="magnifying-glass"
            size={75}
            color="black"
          />
          <Title>Object Detection</Title>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("LandmarkCamera")}>
        <View style={Styles.cameraOptionsButton}>
          <MaterialCommunityIcons
            backgroundColor="#fff"
            name="image-search-outline"
            size={75}
            color="black"
          />
          <Title>Landmark Detection</Title>
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
    paddingTop: 80,
  },
});

export default CameraOptions;
