import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { GoToButton, createFlashcard, Styles } from "./utils";
import TextToSpeech from "./textToSpeech";

function TranslatedText(props) {
  let {
    originalText,
    translatedText,
    result,
    translationData,
    targetLang,
    sourceLang,
  } = props;
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
            }}
          >
            <Text>MAKE FLASHCARD</Text>
          </TouchableOpacity>
          <TextToSpeech
            originalText={originalText}
            translatedText={result}
            sourceLang={sourceLang}
            targetLang={targetLang}
          />
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
