import React from "react";
import { View, Text, Image } from "react-native";
import { GoToButton, Styles } from "./utils";

function ObjectScreen(props) {
  let { sourceObj, targetObj, image } = props;
  console.log("result", props);

  return (
    <View style={Styles.container}>
       <Text style={Styles.title}> {sourceObj}</Text>
      <Image
        style={Styles.image}
        source={{
          uri: image,
        }}
      />
      <Text style={Styles.title}> {targetObj}</Text>
      <GoToButton screenName="ObjectCamera" />
      <GoToButton screenName="Home" />
    </View>
  );
}

export default ObjectScreen;
