import React from "react";
import { connect } from "react-redux";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LandmarkMap from "./landmarkMap";

function GoToButton({ screenName }) {
  const navigation = useNavigation();
  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName)}
    />
  );
}

function LandmarkScreen(props) {
  let { landmark, latitude, longitude } = props.result;
  console.log("result", props);
  return (
    <View>
      <Text> Landmark: {landmark} </Text>
      <Text> Latitude: {latitude} </Text>
      <Text> Longitude: {longitude} </Text>
      <LandmarkMap result={props.result}/>
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
