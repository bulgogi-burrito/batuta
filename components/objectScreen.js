import React from "react";
import { connect } from "react-redux";
import { View, Text, Image } from "react-native";
import { GoToButton, Styles } from "./utils";

function ObjectScreen(props) {
  let { result } = props;
  console.log("result", props);
  return (
    <View style={Styles.container}>
      <Image
        style={Styles.image}
        source={{
          uri: props.image,
        }}
      />
      <Text style={Styles.title}> {result} </Text>
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
