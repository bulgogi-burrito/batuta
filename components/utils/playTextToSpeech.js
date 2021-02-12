import * as React from "react";
import { Button } from "react-native-paper";
import * as Speech from "expo-speech";

export default function PlayTextToSpeech(props) {
  const { text, language } = props;
  console.log("translation language inside playTextToSpeech", language);
  return (
    <Button
      icon="bullhorn-outline"
      mode="text"
      onPress={() =>
        Speech.speak(text, {
          language: language,
        })
      }
    ></Button>
  );
}
