import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  resultContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    flex: 0.45,
  },
  contentContainer: {
    flex: 0.55,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  landmarkImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
  },

  landMarkImageContainer: {
    flex: 0.75,
  },

  landMarkContentContainer: {
    flex: 0.25,
  },

  textOverImage: {
    color: "white",
    fontSize: 40,
    paddingLeft: 8,
    textAlign: "center",
    backgroundColor: "#000000a0",
  },

  textOverImageLandmark: {
    color: "white",
    fontSize: 40,
  },

  landmarkImageTopText: {
    backgroundColor: "#000000a0",
    paddingLeft: 8,
  },
  landmarkImageBottomText: {
    backgroundColor: "#000000a0",
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 10,
  },

  translationsTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  translatedTextBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  objectTextContainer: {
    paddingTop: 56,
    paddingBottom: 58,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Styles;
