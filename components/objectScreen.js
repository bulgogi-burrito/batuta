import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import TextToSpeech from './textToSpeech'
import { GoToButton, createFlashcard, Styles } from "./utils";

function ObjectScreen(props) {
  let {  translationData } = props;
  let {sourceObj, targetObj, image, sourceLang, targetLang} = props.route.params ; 
  
  console.log("route.params in ObjectScreen", props.route.params);

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
          }}
        >
          <Text>MAKE FLASHCARD</Text>
        </TouchableOpacity>
        <TextToSpeech originalText={sourceObj} translatedText={targetObj} 
          sourceLang={sourceLang} targetLang={targetLang} />
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
