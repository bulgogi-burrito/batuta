import React from "react";
import { connect } from "react-redux";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { GoToButton, Card, createFlashcard, createAlert } from "./utils";
import { callGoogleTranslate } from "./google";
import { setTranslation } from "../store/text";
import { addToRecents } from "../store/recentTranslations";

function InputText(props) {
  const [text, setText] = React.useState(null);
  const [textToTranslate, setTextToTranslate] = React.useState(null);
  const [translatedTextResult, setTranslatedTextResult] = React.useState(null);

  const {
    sourceLang,
    targetLang,
    addToRecentTranslations,
    translationData,
  } = props;

  const sumbit = async (text, sourceLang, targetLang) => {
    const translatedResult = await callGoogleTranslate(
      text,
      sourceLang,
      targetLang
    );
    const translationData = {
      content_type: "text",
      input_content: text,
      input_text: text,
      source_language: sourceLang,
      translated_text: translatedResult,
      target_language: targetLang,
    };
    await addToRecentTranslations(translationData);

    setTextToTranslate(text);
    setTranslatedTextResult(translatedResult);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{sourceLang}</Text>
      <View style={styles.flexRow}>
        <TextInput
          multiline={true}
          onChangeText={(text) => setText(text)}
          onSubmitEditing={() => {
            setText(null);
            sumbit(text, sourceLang, targetLang);
          }}
          placeholder="Translate some text"
          style={styles.input}
          value={text}
        />
      </View>
      <Card>
        {textToTranslate && translatedTextResult ? (
          <View>
            <Text>{textToTranslate ? textToTranslate : ""}</Text>
            <Text>{translatedTextResult ? translatedTextResult : ""}</Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  createFlashcard(translationData);
                  createAlert();
                }}
              >
                <Text>MAKE FLASHCARD</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text>Your translation result will appear here</Text>
        )}
      </Card>

      <GoToButton screenName="Home" />
    </View>
  );
}

const mapState = (state) => {
  return {
    sourceLang: state.language.sourceLang,
    targetLang: state.language.targetLang,
    originalText: state.textTranslations.originalText,
    translatedText: state.textTranslations.translatedText,
    translationData: state.recentTranslations[0],
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

export default connect(mapState, mapDispatch)(InputText);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  flexRow: {
    flexDirection: "row",
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 80,
    margin: 16,
    padding: 8,
  },
});
