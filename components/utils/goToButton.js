import React from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
// home-outline
function GoToButton(props) {
  const { screenName, icon } = props;
  const navigation = useNavigation();
  return (
    <Button
      icon={icon}
      mode="contained"
      onPress={() => navigation.navigate(screenName)}
    >
      {screenName}
    </Button>
  );
}

export default GoToButton;
