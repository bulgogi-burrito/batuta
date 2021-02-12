import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { GoToButton, createFlashcard, Styles, createAlert } from "./utils";
import LandmarkMap from "./landmarkMap";
import TextToSpeech from './textToSpeech'

function LandmarkScreen(props) {
  let {
    sourceLang, 
    targetLang ,
    sourceLandmark,
    targetLandmark,
    latitude,
    longitude,
    image } = props.route.params ; 
    let {translationData} = props

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>{sourceLandmark}</Text>
      <Image
        style={Styles.image}
        source={{
          uri: image,
        }}
      />
      <Text style={Styles.title}>
        {targetLandmark} {"\n"}
      </Text>
      <Text style={Styles.title}>
        Latitude: {latitude.toFixed(5)} {"\n"}
        Longitude: {longitude.toFixed(5)} {"\n"}
      </Text>
      <LandmarkMap latitude={latitude} longitude={longitude} />

      <GoToButton screenName="LandmarkCamera" />
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
        <TextToSpeech originalText={sourceLandmark} translatedText={targetLandmark} 
          sourceLang={sourceLang} targetLang={targetLang} />
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

export default connect(mapState)(LandmarkScreen);
