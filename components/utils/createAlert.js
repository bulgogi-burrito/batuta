import { Alert } from "react-native";

const createAlert = () => {
  Alert.alert(
    "Success",
    "Your flashcard was created!",
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );
};
export default createAlert;
