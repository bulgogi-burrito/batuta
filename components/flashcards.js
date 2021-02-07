import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { GoToButton, Card } from "./utils";
const db = import("../db/index"); // importing database class component contains all tables

// in this component we will make a request to the db to get all the cards in the flashcards table
//
function Flashcards(props) {
  return (
    <SafeAreaView>
      <View>
        <Text>THIS IS THE FLASHCARDS VIEW</Text>
      </View>
    </SafeAreaView>
  );
}

export default Flashcards;
