import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { setTranslation } from "../store/text";
import TranslatedText from "./translatedText";
import { callGoogleObject } from "./google";
import ObjectScreen from "./objectScreen";

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
      <View>
        <Text>Finding Object...</Text>
      </View>
    );
  else if (status === "Done" && result) return <ObjectScreen result={result} />;
  else
    return (
      <View style={styles.container}>
        {image && <Image style={styles.image} source={{ uri: image }} />}
        <Button onPress={takePictureAsync} title="Take a Picture" />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    margin: 5,
  },
});

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
