import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { setTranslation } from "../store/text";
import { callGoogleObject } from "./google";
import ObjectScreen from "./objectScreen";
import { Styles } from "./utils";

function ObjectCamera(props) {
  const [image, setImage] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [result, setResult] = React.useState(null);

  const takePictureAsync = async () => {
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      base64: true,
    });

    if (!cancelled) {
      setImage(uri);
      setStatus("Loading...");
      try {
        const { sourceLang, targetLang, setTranslation } = props;
        const objectFromImage = await callGoogleObject(base64);
        console.log("OBJECT:", objectFromImage);
        setResult(objectFromImage);
        setStatus("Done");
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
      setResult(null);
    }
  };

  if (status === "Loading...")
    return (
      <View style={Styles.container}>
        <Text style={Styles.title}>Finding Object...</Text>
      </View>
    );
  else if (status === "Done" && result)
    return <ObjectScreen result={result} image={image} />;
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

export default connect(mapState, mapDispatch)(ObjectCamera);
