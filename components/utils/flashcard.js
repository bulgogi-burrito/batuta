import React, { useState } from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { Card, Styles } from "./index";

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  // we need a set of tags to show the data on the front side
  // like the input_content, input_text, maybe the language, - possibly an audio feature to speak the
  // the language
  // then on the otherside we want the translated_text and possibly an audio feature to speak

  return (
    <TouchableOpacity onPress={() => setFlip(!flip)}>
      <Card>
        {flip ? (
          <View>
            <Image
              style={Styles.image}
              source={{
                uri: flashcard.input_content,
              }}
            />
            <Text>{flashcard.input_text}</Text>
            <Text>text-to-speech Icon</Text>
          </View>
        ) : (
          <View>
            <Image
              style={Styles.image}
              source={{
                uri: flashcard.input_content,
              }}
            />
            <Text>{flashcard.translated_text}</Text>
            <Text>text-to-speech Icon</Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
}
