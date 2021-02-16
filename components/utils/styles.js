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
    flex: 0.42,
  },
  contentContainer: {
    flex: 0.58,
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
    fontSize: 32,
    flex: 0.9,
    flexWrap: "wrap",
  },

  landmarkImageTopText: {
    backgroundColor: "#000000a0",
    paddingLeft: 8,
  },
  landmarkImageBottomText: {
    backgroundColor: "#000000a0",
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 16,
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

  originalTextTranslation: {
    height: 100,
    marginTop: 4,
    paddingTop: 4,
    marginBottom: 10,
    borderTopColor: "#ebecf0",
    borderTopWidth: 1,
  },
  translatedTextTranslation: {
    height: 120,
    marginTop: 4,
    paddingTop: 4,
    marginBottom: 16,
    borderTopColor: "#ebecf0",
    borderTopWidth: 1,
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 128,
    height: 128,
    marginHorizontal: 20,
    marginTop: 70,
  },
  homeSettingsButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 300,
    height: 120,
    marginHorizontal: 20,
    marginTop: 60,
  },
  cameraOptionsButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 220,
    height: 120,
    marginHorizontal: 20,
    marginBottom: 65,
  },
});

export default Styles;
