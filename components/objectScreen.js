import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { GoToButton, createFlashcard, Styles, createAlert } from "./utils";

function ObjectScreen(props) {
  let { sourceObj, targetObj, image, translationData } = props;
  console.log("result", props);

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}> {sourceObj}</Text>
      <Image
        style={Styles.image}
        source={{
          uri: image,
        }}
      />
      <Text style={Styles.title}> {targetObj}</Text>
      <GoToButton screenName="ObjectCamera" />
      <GoToButton screenName="Home" />
      <View>
        <TouchableOpacity
          onPress={() => {
            createFlashcard(translationData);
            createAlert();
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
    translationData: state.recentTranslations[0],
  };
};

export default connect(mapState)(ObjectScreen);
