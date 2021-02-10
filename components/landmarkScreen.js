import React from "react";
import { connect } from "react-redux";
import { View, Text, Image } from "react-native";
import { GoToButton, Styles } from "./utils";
import LandmarkMap from "./landmarkMap";

function LandmarkScreen(props) {
  let { landmark, latitude, longitude } = props.result;
  return (
    <View style={Styles.container}>
      <Image
        style={Styles.image}
        source={{
          uri: props.image,
        }}
      />
      <Text style={Styles.title}>
        {"\n"}
        Landmark: {landmark} {"\n"}
        {"\n"}
        Latitude: {latitude.toFixed(5)} {"\n"}
        Longitude: {longitude.toFixed(5)} {"\n"}
      </Text>
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
