import React from "react";
import { connect } from "react-redux";
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { GoToButton, Card } from "./utils";

function RecentTranslations(props) {
  return (
    <SafeAreaView>
      <FlatList
        style={{ paddingBottom: 200 }}
        data={props.translations}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Card>
              <Text>{item.originalText}</Text>
              <Text>{item.source}</Text>
              <Text>{item.translatedText}</Text>
              <Text>{item.target}</Text>
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
