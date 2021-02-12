import * as ImagePicker from "expo-image-picker";
import React from "react";
import * as Permissions from "expo-permissions";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { setTranslation } from "../store/text";
import { addToRecents } from "../store/recentTranslations";
import TranslatedText from "./translatedText";
import { callGoogleVision, callGoogleTranslate } from "./google";
import { ActivityIndicator } from "react-native-paper";
import { Styles } from "./utils";
import { useNavigation } from "@react-navigation/native";
// import Permissions from './permissions'

function Camera(props) {
  // const {cameraPermission} = props ;
  const navigation = useNavigation();
  const [image, setImage] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const [permissions, setPermissions] = React.useState(false);

  const askPermissionsAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    } else {
      setPermissions(true);
    }
  };

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
          content_type: "image",
          input_content: uri,
          input_text: textFromImage,
          source_language: sourceLang,
          translated_text: translatedResult,
          target_language: targetLang,
        };
        await addToRecentTranslations(translationData);
        setResult(translatedResult);
        setStatus("Done");
        navigation.navigate('TranslatedText' , {
          sourceLang : props.sourceLang,  
          result : translatedResult , 
          image : uri ,
          targetLang : props.targetLang
        })
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
      setResult(null);
    }
  };
  console.log(status) ; 
  if (status === "Loading...")
    return (
      <View style={Styles.container}>
        <ActivityIndicator animating={true} color={"#418fde"} size="large" />
      </View>
    );
  else if (status === "Done" && result) {
    return (
      <TranslatedText
        sourceLang={props.sourceLang}
        result={result}
        image={image}
        targetLang={props.targetLang}
      />
    );
    setImage(null);
    setStatus(null);
    setResult(null); 
    // return (<View><Text>heading to Translated text Screen</Text></View> ) 
    // <TranslatedText sourceLang={props.sourceLang} result={result} image={image} targetLang={props.targetLang} />;
  } else if (!permissions) {
    return (
      <View style={Styles.container}>
        <Button title="Set Camera Permission" onPress={askPermissionsAsync} />
      </View>
    );
  } else {
    console.log(result,image,status) ; 
    return (
      <View style={Styles.container}>
        {image && <Image style={Styles.image} source={{ uri: image }} />}
        <Button onPress={takePictureAsync} title="Take a Picture" />
      </View>
    );
  }
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

export default connect(mapState, mapDispatch)(Camera);
