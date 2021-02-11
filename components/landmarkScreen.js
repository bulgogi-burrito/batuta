import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { GoToButton, createFlashcard, Styles } from "./utils";
import LandmarkMap from "./landmarkMap";

function LandmarkScreen(props) {
  let {
    sourceLandmark,
    targetLandmark,
    latitude,
    longitude,
    image,
    translationData,
  } = props;
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>{sourceLandmark}</Text>
      <Image
        style={Styles.image}
        source={{
          uri: image,
        }}
      />
      <Text style={Styles.title}>
        {targetLandmark} {"\n"}
      </Text>
      <Text style={Styles.title}>
        Latitude: {latitude.toFixed(5)} {"\n"}
        Longitude: {longitude.toFixed(5)} {"\n"}
      </Text>
      <LandmarkMap latitude={latitude} longitude={longitude} />

      <GoToButton screenName="LandmarkCamera" />
      <GoToButton screenName="Home" />
      <View>
        <TouchableOpacity
          onPress={() => {
            createFlashcard(translationData);
          }}
        >
          <Text>MAKE FLASHCARD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapState = (state) => {
  return {
    originalText: state.textTranslations.originalText,
    translatedText: state.textTranslations.translatedText,
    translationData: state.recentTranslations[0],
  };
};

export default connect(mapState)(LandmarkScreen);
