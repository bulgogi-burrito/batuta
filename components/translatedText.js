import React from "react";
import { connect } from "react-redux";
import { Button } from "react-native-paper";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  GoToButton,
  MakeFlashcard,
  Styles,
  Card,
  PlayTextToSpeech,
} from "./utils";

import TextToSpeech from "./textToSpeech";

function TranslatedText(props) {
  let { originalText, translatedText, translationData} = props;
  console.log('what is in props in TranslatedText' , originalText , translatedText) ;
  const { image , result , targetLang , sourceLang } = props.route.params
  console.log('what is in route.params in TranslatedText', result , targetLang,sourceLang )
  console.log('info from route.params' , result , targetLang, sourceLang) ; 
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
      <SafeAreaView style={Styles.container}>
        <View style={Styles.imageContainer}>
          <Image
            style={Styles.image}
            source={{
              uri: props.image,  }}

          />
        </View>
        <Card>
          <Text style={Styles.title}>
            {"\n"}
            {"\n"}Original: {originalText}
            {"\n"}
          </Text>
          <PlayTextToSpeech text={originalText} language={sourceLang} />
          <Text style={Styles.title}>
            {"\n"}
            {"\n"}Translated: {translatedText}
            {"\n"}
          </Text>
          <PlayTextToSpeech text={translatedText} language={targetLang} />
        </Card>
        <GoToButton screenName="Home" icon="home-outline" />
        {/* <GoToButton screenName="Camera" />*/}
        <View>
          <MakeFlashcard data={translationData} />
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
