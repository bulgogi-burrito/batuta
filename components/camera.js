import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";
AIzaSyAZ8lxUr-w8s-dYd1qRnjLvIuCsgLHixpYAIzaSyAZ8lxUr-w8s-dYd1qRnjLvIuCsgLHixpY
const __takePicture = async () => {
  const photo = await this.camera.takePictureAsync({
    base64: true,
  });
  console.log(photo);
  _convertToText(photo);
};

const _convertToText = async (photo) => {
  try {
    let response = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" + APIKEY,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: photo.base64,
              },
              features: [
                {
                  type: `TEXT_DETECTION`,
                  maxResults: 1,
                },
              ],
            },
          ],
        }),
      }
    );
    const responseJSON = await response.json();
    if (
      !(
        responseJSON &&
        responseJSON.responses &&
        responseJSON.responses[0] &&
        responseJSON.responses[0].fullTextAnnotation
      )
    ) {
      Alert.alert(
        "There was no readable text in your image. Please try again."
      );
    } else {
      const text = responseJSON.responses[0].fullTextAnnotation.text;
      console.log(text);
    }
  } catch (err) {
    console.error("An error occurred during text conversion:", err);
  }
};

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          this.camera = ref;
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              flex: 1,
              width: "100%",
              padding: 20,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                alignSelf: "center",
                flex: 1,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={__takePicture}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: "#fff",
                }}
              />
            </View>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
