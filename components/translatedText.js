import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { GoToButton, createFlashcard } from "./utils";

function TranslatedText(props) {
  let { originalText, translatedText, result, translationData } = props;
  console.log("original", originalText);
  console.log("translated", translatedText);
  console.log("result", result);
  console.log("translationData -->", translationData);

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
        <View>
          <TouchableOpacity onPress={() => createFlashcard(translationData)}>
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

export default connect(mapState)(TranslatedText);
