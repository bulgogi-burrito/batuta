import React from "react";
import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import { Divider } from "react-native-paper";
import { connect } from "react-redux";
import {
  GoToButton,
  Styles,
  Card,
  MakeFlashcard,
  PlayTextToSpeech,
} from "../utils";

function ObjectScreen(props) {
  let { translationData } = props;
  let {
    sourceObj,
    targetObj,
    image,
    sourceLang,
    targetLang,
  } = props.route.params;

  console.log("route.params in ObjectScreen", props.route.params);

  return (
    <SafeAreaView style={Styles.resultContainer}>
      <View style={Styles.imageContainer}>
        <ImageBackground style={Styles.image} source={{ uri: image }}>
          <Text style={Styles.textOverImage}>{sourceObj}</Text>
        </ImageBackground>
      </View>
      <View style={Styles.contentContainer}>
        <Card>
          <View style={Styles.objectTextContainer}>
            <Text style={{ fontSize: 40 }}>{targetObj}</Text>
          </View>
          <Divider />
          <View style={Styles.translationsTopRow}>
            <View style={Styles.translatedTextBottom}>
              <PlayTextToSpeech
                text={sourceObj}
                language={sourceLang}
                innerText="Object"
              />
            </View>

            <View style={Styles.translatedTextBottom}>
              <PlayTextToSpeech
                text={targetObj}
                language={targetLang}
                innerText="Translation"
              />
            </View>
          </View>
        </Card>
        <View style={Styles.translatedTextBottom}>
          <MakeFlashcard mode="contained" data={translationData} />
          <GoToButton screenName="Home" icon="home-outline" />
        </View>
      </View>

      <View></View>
    </SafeAreaView>
  );
}

const mapState = (state) => {
  return {
    translationData: state.recentTranslations[0],
  };
};

export default connect(mapState)(ObjectScreen);
