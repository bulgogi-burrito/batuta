import React from "react";
import { connect } from "react-redux";
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { GoToButton, Card, createFlashcard, languages } from "./utils";

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
              <Text>{item.input_text}</Text>
              <Text>{languages[item.source_language]}</Text>
              <Text>{item.translated_text}</Text>
              <Text>{languages[item.target_language]}</Text>
              <TouchableOpacity
                onPress={() => {
                  createFlashcard({
                    content_type: item.content_type,
                    input_content: item.input_content,
                    input_text: item.input_text,
                    source_language: item.source_language,
                    translated_text: item.translated_text,
                    target_language: item.target_language,
                  });
                }}
              >
                <Text>MAKE FLASHCARD</Text>
              </TouchableOpacity>
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

// we need something that will maptodispatch for creating flash
// cards in this view on button press

export default connect(mapState)(RecentTranslations);
