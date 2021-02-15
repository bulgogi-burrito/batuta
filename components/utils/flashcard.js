import React, { useState } from "react";
import { TouchableOpacity, Image, View, StyleSheet, Alert } from "react-native";
// import Card from "./card"
import PlayTextToSpeech from "./playTextToSpeech";
import Styles from "./styles";
import { Button, Subheading } from "react-native-paper";

export default function Flashcard(props) {
  const [flip, setFlip] = useState(true);
  const { flashcard, deleteItem } = props;
  // flashcard.content_type

  const deletionAlert = (id) => {
    Alert.alert(
      "Delete Alert",
      "Press OK to delete flashcard",
      [
        { text: "OK", onPress: () => deleteItem(id) },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <TouchableOpacity onPress={() => setFlip(!flip)}>
      {flip ? (
        <View style={styles.front}>
          <View style={Styles.translationsTopRow}>
            <Button
              icon="close"
              mode="text"
              color="red"
              onPress={() => deletionAlert(flashcard.id)}
            ></Button>
            <PlayTextToSpeech
              text={flashcard.input_text}
              language={flashcard.source_language}
            />
          </View>

          <View style={styles.cardContent}>
            {flashcard.content_type == "image" ? (
              <>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: flashcard.input_content,
                    }}
                  />
                </View>
                <View style={styles.contentContainer}>
                  <Subheading style={{ textAlign: "center" }}>
                    {flashcard.input_text}
                  </Subheading>
                </View>
              </>
            ) : (
              <View style={styles.contentContainer}>
                <Subheading style={{ textAlign: "center" }}>
                  {flashcard.input_text}
                </Subheading>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.back}>
          <View style={Styles.translationsTopRow}>
            <Button
              icon="close"
              mode="text"
              color="red"
              onPress={() => deletionAlert(flashcard.id)}
            ></Button>
            <PlayTextToSpeech
              text={flashcard.translated_text}
              language={flashcard.target_language}
            />
          </View>

          <View style={styles.cardContent}>
            {flashcard.content_type == "image" ? (
              <>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: flashcard.input_content,
                    }}
                  />
                </View>

                <View style={styles.contentContainer}>
                  <Subheading style={{ textAlign: "center" }}>
                    {flashcard.translated_text}
                  </Subheading>
                </View>
              </>
            ) : (
              <View style={styles.contentContainer}>
                <Subheading style={{ textAlign: "center" }}>
                  {flashcard.translated_text}
                </Subheading>
              </View>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  front: {
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.4,
    shadowRadius: 3,
    marginHorizontal: 6,
    marginVertical: 8,
  },
  back: {
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "#DCDCDC",
    shadowOffset: { width: 1.25, height: 1.25 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 6,
    marginVertical: 8,
  },
  cardContent: {
    marginVertical: 4,
    paddingBottom: 24,
    height: 300,
  },

  image: {
    height: "100%",
    width: "55%",
    resizeMode: "stretch",
  },

  imageContainer: {
    backgroundColor: "#131313",
    alignItems: "center",
    flex: 2,
    width: "100%",
  },

  contentContainer: {
    flex: 1,
    marginHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
