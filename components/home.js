import React from "react";
import { View, Text, Button } from "react-native";
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
        <GoToButton screenName="microphone" />
        <GoToButton screenName="Settings" />
        <GoToButton screenName="LandmarkCamera" />
      </View>
    );
  }
}

export default Home;
