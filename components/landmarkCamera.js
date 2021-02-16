import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Button, Image, Text, View } from "react-native";
import { connect } from "react-redux";
import { setTranslation } from "../store/text";
import { callGoogleLandmark, callGoogleTranslate } from "./google";
import { addToRecents } from "../store/recentTranslations";
import LandmarkScreen from "./landmarkScreen";
import { ActivityIndicator } from "react-native-paper";
import { Styles } from "./utils";
import { useNavigation } from "@react-navigation/native";

function LandmarkCamera(props) {
  const navigation = useNavigation();

  const [image, setImage] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [sourceLandmark, setSource] = React.useState(null);
  const [targetLandmark, setTarget] = React.useState(null);
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);

  const takePictureAsync = async () => {
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      base64: true,
    });

    if (!cancelled) {
      setImage(uri);
      setStatus("Loading...");
      try {
        const { sourceLang, targetLang, addToRecentTranslations } = props;
        let { landmark, latitude, longitude } = await callGoogleLandmark(
          base64
        );
        console.log("THIS IS THE LANDMARK PROP AFTER CALL --->", landmark);
        let sourceLandmark = landmark;

        if (sourceLang !== "en") {
          sourceLandmark = await callGoogleTranslate(
            landmark,
            "en",
            sourceLang
          );
        }

        const targetLandmark = await callGoogleTranslate(
          sourceLandmark,
          sourceLang,
          targetLang
        );

        const translationData = {
          content_type: "image",
          input_content: uri,
          input_text: sourceLandmark,
          source_language: sourceLang,
          translated_text: targetLandmark,
          target_language: targetLang,
        };
        await addToRecentTranslations(translationData);

        setSource(sourceLandmark);
        setTarget(targetLandmark);
        setLatitude(latitude);
        setLongitude(longitude);
        setStatus("Done");
        navigation.navigate("LandmarkScreen", {
          sourceLandmark: sourceLandmark,
          targetLandmark: targetLandmark,
          latitude: latitude,
          longitude: longitude,
          image: uri,
          sourceLang: props.sourceLang,
          targetLang: props.targetLang,
        });
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
      setSource(null);
      setTarget(null);
      setLatitude(null);
      setLongitude(null);
    }
  };

  if (status === "Loading...")
    return (
      <View style={Styles.container}>
        <ActivityIndicator animating={true} color={"#418fde"} size="large" />
      </View>
    );
  else if (
    status === "Done" &&
    sourceLandmark &&
    targetLandmark &&
    latitude &&
    longitude
  ) {
    setImage(null);
    setStatus(null);
    setSource(null);
    setTarget(null);
    setLatitude(null);
    setLongitude(null);
  } else
    return (
      <View style={Styles.container}>
        <Button onPress={takePictureAsync} title="Take a Picture" />
      </View>
    );
}

const mapState = (state) => {
  return {
    sourceLang: state.language.sourceLang,
    targetLang: state.language.targetLang,
    cameraPermission: state.permissions.cameraPermission,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setTranslation: (originalText, translatedText) =>
      dispatch(setTranslation(originalText, translatedText)),
    addToRecentTranslations: (translationData) =>
      dispatch(addToRecents(translationData)),
  };
};

export default connect(mapState, mapDispatch)(LandmarkCamera);
