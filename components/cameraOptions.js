import React from "react";
import { View, StyleSheet } from "react-native";
import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function CameraOptions() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        backgroundColor="#fff"
        name="translate"
        size={75}
        color="black"
        onPress={() => navigation.navigate("Camera")}
      />
      <Foundation
        backgroundColor="#fff"
        name="magnifying-glass"
        size={75}
        color="black"
        onPress={() => navigation.navigate("ObjectCamera")}
      />
      <MaterialCommunityIcons
        backgroundColor="#fff"
        name="image-search-outline"
        size={75}
        color="black"
        onPress={() => navigation.navigate("LandmarkCamera")}
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

export default CameraOptions;
