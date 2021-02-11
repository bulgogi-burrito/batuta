import React from "react";
import { View, Button } from "react-native";
import openMap from "react-native-open-maps";

export default function LandmarkMap(props) {
  const goToLandmark = (provider) => {
    openMap({
      latitude: props.latitude,
      longitude: props.longitude,
      provider,
    });
  };

  return (
    <View>
      <Button
        onPress={() => goToLandmark("google")}
        title="Open in Google Maps"
      />
      <Button
        onPress={() => goToLandmark("apple")}
        title="Open in Apple Maps"
      />
    </View>
  );
}
