import React from "react";
import { connect } from "react-redux";
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Card,
  MakeFlashcard,
  PlayTextToSpeech,
  languages,
  Styles,
} from "./utils";
import {
  Subheading,
  Caption,
  Divider,
} from "react-native-paper";

function RecentTranslations(props) {
  return (
    <SafeAreaView>
      <FlatList
        style={{ paddingBottom: 200 }}
        data={props.translations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Card>
              <View style={Styles.translationsTopRow}>
                <Caption>{languages[item.source_language]}</Caption>

                <PlayTextToSpeech
                  text={item.input_text}
                  language={item.source_language}
                />
              </View>
              <View style={{ marginBottom: 10 }}>
                <Subheading>{item.input_text}</Subheading>
              </View>
              <Divider style={{ marginBottom: 10 }} />
              <View style={Styles.translationsTopRow}>
                <Caption>{languages[item.target_language]}</Caption>
                <PlayTextToSpeech
                  text={item.translated_text}
                  language={item.target_language}
                />
              </View>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <Subheading>{item.translated_text}</Subheading>
              </View>
              <MakeFlashcard
                mode="outlined"
                data={{
                  content_type: item.content_type,
                  input_content: item.input_content,
                  input_text: item.input_text,
                  source_language: item.source_language,
                  translated_text: item.translated_text,
                  target_language: item.target_language,
                }}
              />
            </Card>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const mapState = (state) => {
  return {
    translations: state.recentTranslations,
  };
};

export default connect(mapState)(RecentTranslations);
