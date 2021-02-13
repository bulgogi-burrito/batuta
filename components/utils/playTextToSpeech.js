import * as React from "react";
import { Button } from "react-native-paper";
import * as Speech from "expo-speech";

export default function PlayTextToSpeech(props) {
  const { text, language, innerText } = props;
  console.log("translation language inside playTextToSpeech", language);
  return (
    <Button
      icon="bullhorn-outline"
      style={{ paddingRight: 0 }}
      mode="text"
      onPress={() =>
        Speech.speak(text, {
          language: language,
        })
      }
    >
      {innerText}
    </Button>
  );
}
