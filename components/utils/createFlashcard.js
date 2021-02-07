import React from "react";
import { Alert, Button } from "react-native";

const createOkButtonAlert = () =>
  Alert.alert(
    "Flashcard was successfully made!",
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );

//need to pass in function to create card and send to SqlLite db to make card instance
function CreateFlashcard() {
  return (
    <View>
      <Button title={"Make flashcard"} onPress={createOkButtonAlert} />
    </View>
  );
}
export default CreateFlashcard;
