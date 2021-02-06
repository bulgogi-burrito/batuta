import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { setTranslation } from "../store/text";
import { addToRecents } from "../store/recentTranslations";
import TranslatedText from "./translatedText";
import { callGoogleVision, callGoogleTranslate } from "./google";
// import Permissions from './permissions'

function Camera(props) {
  // const {cameraPermission} = props ;
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
        const {
          sourceLang,
          targetLang,
          setTranslation,
          addToRecentTranslations,
        } = props;
        const textFromImage = await callGoogleVision(base64);
        const translatedResult = await callGoogleTranslate(
          textFromImage,
          sourceLang,
          targetLang
        );
        await setTranslation(textFromImage, translatedResult);

        // Data for recent translations & redux action for adding to store
        const translationData = {
          originalText: textFromImage,
          source: sourceLang,
          translatedText: translatedResult,
          target: targetLang,
        };
        await addToRecentTranslations(translationData);
        setResult(translatedResult);
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
        <Text>Making Translation</Text>
      </View>
    );
  else if (status === "Done" && result)
    return <TranslatedText result={result} />;
  else
    return (
      <View style={styles.container}>
        {/* {cameraPermission === false ? (
         <>
         <Permissions type={'camera'} />
         </>
      ) : ( */}
        <>
          {image && <Image style={styles.image} source={{ uri: image }} />}
          <Button onPress={takePictureAsync} title="Take a Picture" />
        </>
        {/* )} */}
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
    addToRecentTranslations: (translationData) =>
      dispatch(addToRecents(translationData)),
  };
};

export default connect(mapState, mapDispatch)(Camera);
