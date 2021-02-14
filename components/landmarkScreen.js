import React from "react";
import { connect } from "react-redux";
import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import { GoToButton, MakeFlashcard, Styles, PlayTextToSpeech } from "./utils";
import LandmarkMap from "./landmarkMap";

function LandmarkScreen(props) {
  let {
    sourceLang,
    targetLang,
    sourceLandmark,
    targetLandmark,
    latitude,
    longitude,
    image,
  } = props.route.params;
  let { translationData } = props;

  return (
    <SafeAreaView style={Styles.resultContainer}>
      <View style={Styles.landMarkImageContainer}>
        <ImageBackground style={Styles.landmarkImage} source={{ uri: image }}>
          <View style={Styles.landmarkImageTopText}>
            <View style={Styles.translationsTopRow}>
              <Text style={Styles.textOverImageLandmark}>{sourceLandmark}</Text>
              <PlayTextToSpeech text={sourceLandmark} language={sourceLang} />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "white" }}>
                {" "}
                Latitude: {latitude.toFixed(5)}{" "}
              </Text>
              <Text style={{ color: "white" }}>
                {" "}
                Longitude: {longitude.toFixed(5)}{" "}
              </Text>
            </View>
          </View>

          <View style={Styles.landmarkImageBottomText}>
            <View style={Styles.translationsTopRow}>
              <Text style={Styles.textOverImageLandmark}>{targetLandmark}</Text>

              <PlayTextToSpeech text={targetLandmark} language={targetLang} />
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={Styles.landMarkContentContainer}>
        <LandmarkMap latitude={latitude} longitude={longitude} />

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

export default connect(mapState)(LandmarkScreen);
