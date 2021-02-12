import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { db } from "../../db";
import PlayTextToSpeech from "./playTextToSpeech";

export default function Flashcard(props) {
  const [flip, setFlip] = useState(true);
  const { flashcard, onPressDelete } = props;
  // font has the input_content, input_text, maybe the language, - possibly an audio feature to speak the
  // the language
  // then on the otherside we want the translated_text and possibly an audio feature to speak

  return (
    <TouchableOpacity onPress={() => setFlip(!flip)}>
      {flip ? (
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Image
              style={styles.image}
              source={{
                uri: flashcard.input_content,
              }}
            />
            <Text>{flashcard.input_text}</Text>
            <PlayTextToSpeech
              text={flashcard.input_text}
              language={flashcard.source_language}
            />
            {/* <Button
              title="Delete card"
              onPress={() => onPressDelete(flashcard.id)}
            /> */}
          </View>
        </View>
      ) : (
        <View style={styles.back}>
          <View style={styles.cardContent}>
            <Image
              style={styles.image}
              source={{
                uri: flashcard.input_content,
              }}
            />
            <Text>{flashcard.translated_text}</Text>
            <PlayTextToSpeech
              text={flashcard.translated_text}
              language={flashcard.target_language}
            />
          </View>
        </View>
      )}
      {/* <Button
          onPress={(flashcard) => {
            db.transaction(
              (tx) => {
                tx.executeSql(`delete from flashcards where id = ?;`, [
                  flashcard.id,
                ]);
              },
              null,
              createAlert()
            );
          }}
          title="Delete"
          onPress={() => onPressItem && onPressItem(id)}
        /> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 6,
    marginVertical: 4,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  back: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#C4C4C4",
    shadowOffset: { width: 1.25, height: 1.25 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 6,
    marginVertical: 4,
  },
  image: {
    width: 280,
    height: 280,
  },
});
