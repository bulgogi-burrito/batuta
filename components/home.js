import React from "react";
import { View, Text } from "react-native";
import { GoToButton } from "./utils";

class Home extends React.Component {
  render() {
    return (
      <View>
        <Text> Home </Text>
        <GoToButton screenName="Camera" />
        <GoToButton screenName="Microphone" />
        <GoToButton screenName="Settings" />
        <GoToButton screenName="LandmarkCamera" />
        <GoToButton screenName="ObjectCamera" />
        <GoToButton screenName="Recents" />
      </View>
    );
  }
}

export default Home;
