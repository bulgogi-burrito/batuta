import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { GoToButton } from "./utils";

function ObjectScreen(props) {
  let { result } = props;
  console.log("result", props);
  return (
    <View>
      <Text> Object: {result} </Text>
      <GoToButton screenName="ObjectCamera" />
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

export default connect(mapState)(ObjectScreen);
