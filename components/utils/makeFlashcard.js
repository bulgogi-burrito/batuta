import React from "react";
import { Button } from "react-native-paper";
import createFlashcard from "./createFlashcard";
// home-outline
function MakeFlashcard(props) {
  const { data, mode } = props;
  return (
    <Button
      icon="cards-outline"
      mode={mode}
      onPress={() => createFlashcard(data)}
    >
      Make Flashcard
    </Button>
  );
}

export default MakeFlashcard;
