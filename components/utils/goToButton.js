import React from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

function GoToButton({ screenName }) {
  const navigation = useNavigation();
  return (
    <Button
      title={`${screenName}`}
      onPress={() => navigation.navigate(screenName)}
    />
  );
}

export default GoToButton;
