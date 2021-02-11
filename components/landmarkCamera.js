import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Button, Image, Text, View } from "react-native";
import { set } from "react-native-reanimated";
import { connect } from "react-redux";
import { setTranslation } from "../store/text";
import { callGoogleLandmark, callGoogleTranslate } from "./google";
import LandmarkScreen from "./landmarkScreen";
import { Styles } from "./utils";

function LandmarkCamera(props) {
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
        const { sourceLang, targetLang } = props;
        let { landmark, latitude, longitude } = await callGoogleLandmark(
          base64
        );
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

        setSource(sourceLandmark);
        setTarget(targetLandmark);
        setLatitude(latitude);
        setLongitude(longitude);
        setStatus("Done");
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
        <Text style={Styles.title}>Finding Landmark...</Text>
      </View>
    );
  else if (
    status === "Done" &&
    sourceLandmark &&
    targetLandmark &&
    latitude &&
    longitude
  )
    return (
      <LandmarkScreen
        sourceLandmark={sourceLandmark}
        targetLandmark={targetLandmark}
        latitude={latitude}
        longitude={longitude}
        image={image}
      />
    );
  else
    return (
      <View style={Styles.container}>
        {image && <Image style={Styles.image} source={{ uri: image }} />}
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
  };
};

export default connect(mapState, mapDispatch)(LandmarkCamera);
