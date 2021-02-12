import * as React from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import * as Speech from "expo-speech";

export default function PlayTextToSpeech(props) {
  const { text, language } = props;
  console.log("translation language inside playTextToSpeech", language);
  return (
    <View>
      <Button
        title={"playsound"}
        onPress={() =>
          Speech.speak(text, {
            language: language,
          })
        }
      />
    </View>
  );
}
