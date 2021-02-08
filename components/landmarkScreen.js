import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { GoToButton } from "./utils";
import LandmarkMap from "./landmarkMap";

function LandmarkScreen(props) {
  let { landmark, latitude, longitude } = props.result;
  console.log("result", props);
  return (
    <View>
      <Text> Landmark: {landmark} </Text>
      <LandmarkMap result={props.result} />
      <GoToButton screenName="LandmarkCamera" />
      <GoToButton screenName="Home" />
    </View>
  );
}

const mapState = (state) => {
  return {
    originalText: state.textTranslations.originalText,
    translatedText: state.textTranslations.translatedText,
  };
};

export default connect(mapState)(LandmarkScreen);
