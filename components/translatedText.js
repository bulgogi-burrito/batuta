import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, SafeAreaView, ScrollView } from "react-native";
import {
  GoToButton,
  MakeFlashcard,
  Styles,
  Card,
  PlayTextToSpeech,
} from "./utils";
import { Title, Subheading, Divider } from "react-native-paper";

function TranslatedText(props) {
  let { originalText, translatedText, translationData } = props;
  console.log(
    "what is in props in TranslatedText",
    originalText,
    translatedText
  );
  const { image, result, targetLang, sourceLang } = props.route.params;
  console.log(
    "what is in route.params in TranslatedText",
    result,
    targetLang,
    sourceLang
  );
  console.log("info from route.params", result, targetLang, sourceLang);
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
      <SafeAreaView style={Styles.resultContainer}>
        <View style={Styles.imageContainer}>
          <Image style={Styles.image} source={{ uri: image }} />
        </View>
        <View style={Styles.contentContainer}>
          <Card>
            <View style={Styles.translationsTopRow}>
              <Subheading>{`Original (${sourceLang})`}</Subheading>
              <PlayTextToSpeech text={originalText} language={sourceLang} />
            </View>
            <ScrollView style={Styles.originalTextTranslation}>
              <Title style={{ color: "gray" }}>{originalText}</Title>
            </ScrollView>

            <View style={Styles.translationsTopRow}>
              <Subheading>{`Translated (${targetLang})`}</Subheading>
              <PlayTextToSpeech text={translatedText} language={targetLang} />
            </View>
            <ScrollView style={Styles.translatedTextTranslation}>
              <Title>{translatedText}</Title>
            </ScrollView>
          </Card>
          <View style={Styles.translatedTextBottom}>
            <MakeFlashcard mode="contained" data={translationData} />
            <GoToButton screenName="Home" icon="home-outline" />
          </View>
        </View>
      </SafeAreaView>
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
