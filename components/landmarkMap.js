import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import openMap from "react-native-open-maps";
import { Styles } from "./utils";

export default function LandmarkMap(props) {
  const goToLandmark = (provider) => {
    openMap({
      latitude: props.latitude,
      longitude: props.longitude,
      provider,
    });
  };

  return (
    //translatedTextBottom { alignItems: "center" }
    <View style={{ alignItems: "center", paddingVertical: 10 }}>
      <Button
        onPress={() => goToLandmark("apple")}
        mode="outlined"
        icon="apple"
        style={{ marginBottom: 8 }}
      >
        Open in Apple Maps
      </Button>
      <Button
        onPress={() => goToLandmark("google")}
        mode="outlined"
        icon="google-maps"
      >
        Open in Google Maps
      </Button>
    </View>
  );
}
