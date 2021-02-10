import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { GoToButton, createFlashcard, Styles, createAlert } from "./utils";

function TranslatedText(props) {
  let { originalText, translatedText, result, translationData } = props;
  console.log("original", originalText);
  console.log("translated", translatedText);
  console.log("result", result);
  console.log("translationData -->", translationData);

  if (result !== translatedText)
    return (
      <View style={Styles.container}>
        <Text>Loading Translation...</Text>
      </View>
    );
  else
    return (
      <View style={Styles.container}>
        <Image
          style={Styles.image}
          source={{
            uri: props.image,
          }}
        />
        <Text style={Styles.title}>
          {"\n"}Original: {originalText}
          {"\n"}
          {"\n"}Translated: {translatedText}
          {"\n"}
        </Text>
        <GoToButton screenName="Home" />
        {/* <GoToButton screenName="Camera" />*/}
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
    originalText: state.textTranslations.originalText,
    translatedText: state.textTranslations.translatedText,
    translationData: state.recentTranslations[0],
  };
};

export default connect(mapState)(TranslatedText);
