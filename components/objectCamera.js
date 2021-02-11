import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { setTranslation } from "../store/text";
import { addToRecents } from "../store/recentTranslations";
import { callGoogleObject, callGoogleTranslate } from "./google";
import ObjectScreen from "./objectScreen";
import { Styles } from "./utils";

function ObjectCamera(props) {
  const [image, setImage] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [sourceObj, setSource] = React.useState(null);
  const [targetObj, setTarget] = React.useState(null);

  const takePictureAsync = async () => {
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      base64: true,
    });

    if (!cancelled) {
      setImage(uri);
      setStatus("Loading...");
      try {
        const { sourceLang, targetLang, addToRecentTranslations } = props;
        let sourceObject = await callGoogleObject(base64);
        if (sourceLang !== "en") {
          sourceObject = await callGoogleTranslate(
            objectFromImage,
            "en",
            sourceLang
          );
        }

        const targetObject = await callGoogleTranslate(
          sourceObject,
          sourceLang,
          targetLang
        );

        const translationData = {
          content_type: "image",
          input_content: uri,
          input_text: sourceObject,
          source_language: sourceLang,
          translated_text: targetObject,
          target_language: targetLang,
        };
        await addToRecentTranslations(translationData);
        setSource(sourceObject);
        setTarget(targetObject);
        setStatus("Done");
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
      setSource(null);
      setTarget(null);
    }
  };

  if (status === "Loading...")
    return (
      <View style={Styles.container}>
        <Text style={Styles.title}>Finding Object...</Text>
      </View>
    );
  else if (status === "Done" && sourceObj && targetObj)
    return (
      <ObjectScreen sourceObj={sourceObj} targetObj={targetObj} image={image} />
    );
  else
    return (
      <View style={Styles.container}>
        {image && <Image style={Styles.image} source={{ uri: image }} />}
        <Button onPress={takePictureAsync} title="Identify Object" />
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
    addToRecentTranslations: (translationData) =>
      dispatch(addToRecents(translationData)),
  };
};

export default connect(mapState, mapDispatch)(ObjectCamera);
