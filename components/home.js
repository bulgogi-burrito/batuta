import React from "react";
import { connect } from "react-redux";
import { Picker, View, Text, Touchable, Button } from "react-native";
import { changeSourceLang, changeTargetLang } from "../store/settings";
import Camera from "./camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

function GoToButton({ screenName }) {
  const navigation = useNavigation();
  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName)}
    />
  );
}

class Home extends React.Component {
  render() {
    return (
      <View>
        <Text> Home </Text>
        <GoToButton screenName="Camera" />
      </View>
    );
  }
}

export default Home;
