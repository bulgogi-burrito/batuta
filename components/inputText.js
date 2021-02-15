import React from "react";
import { connect } from "react-redux";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import {
  Subheading,
  Title,
  Caption,
  Divider,
  Button,
} from "react-native-paper";
import {
  Styles,
  Card,
  MakeFlashcard,
  PlayTextToSpeech,
  languages,
} from "./utils";
import { callGoogleTranslate } from "./google";
import { setTranslation } from "../store/text";
import { addToRecents } from "../store/recentTranslations";
import { ScrollView } from "react-native-gesture-handler";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

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
    <SafeAreaView style={styles.container}>
      <DismissKeyboard>
        <ScrollView>
          <View style={styles.card}>
            <View style={Styles.translationsTopRow}>
              <Title style={{ paddingLeft: 20, paddingTop: 8 }}>
                {languages[sourceLang]}
              </Title>
              <Button style={{ paddingTop: 8 }} icon="playlist-remove"></Button>
            </View>

            <View style={styles.flexRow}>
              <TextInput
                multiline={true}
                onChangeText={(text) => setText(text)}
                onSubmitEditing={() => {
                  sumbit(text, sourceLang, targetLang);
                  setText(null);
                }}
                placeholder="Type some text and hit enter to translate..."
                style={styles.input}
                value={text}
              />
            </View>
          </View>
          <Card>
            <View style={Styles.translationsTopRow}>
              <Caption>{languages[sourceLang]}</Caption>

              <PlayTextToSpeech text={textToTranslate} language={sourceLang} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Subheading>{textToTranslate ? textToTranslate : ""}</Subheading>
            </View>
            <Divider style={{ marginBottom: 20 }} />
            <View style={Styles.translationsTopRow}>
              <Caption>{languages[targetLang]}</Caption>
              <PlayTextToSpeech
                text={translatedTextResult}
                language={targetLang}
              />
            </View>
            <View style={{ marginTop: 10, marginBottom: 40 }}>
              <Subheading>
                {translatedTextResult ? translatedTextResult : ""}
              </Subheading>
            </View>
            <View>
              {translatedTextResult ? (
                <MakeFlashcard mode="contained" data={translationData} />
              ) : (
                <Button icon="cards-outline" mode="outlined">
                  Make Flashcard
                </Button>
              )}
            </View>
          </Card>
        </ScrollView>
      </DismissKeyboard>
    </SafeAreaView>
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
  flexRow: {
    flexDirection: "row",
  },
  input: {
    borderColor: "#4630eb",
    backgroundColor: "#ECECEC",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 80,
    margin: 16,
    padding: 8,
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 6,
    marginVertical: 6,
  },
});
