import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { GoToButton, CreateFlashcard } from "./utils";

function TranslatedText(props) {
  let { originalText, translatedText, result } = props;
  console.log("original", originalText);
  console.log("translated", translatedText);
  console.log("result", result);
  if (result !== translatedText)
    return (
      <View>
        <Text>Loading Translation</Text>
      </View>
    );
  else
    return (
      <View>
        <Text> {originalText} </Text>
        <Text> {translatedText} </Text>
        <GoToButton screenName="Home" />
        {/* <GoToButton screenName="Camera" />*/}
        <CreateFlashcard />
      </View>
    );
}

const mapState = (state) => {
  return {
    originalText: state.textTranslations.originalText,
    translatedText: state.textTranslations.translatedText,
  };
};

// we need something that will maptodispatch for creating flash
// cards in this view on button press

export default connect(mapState)(TranslatedText);
