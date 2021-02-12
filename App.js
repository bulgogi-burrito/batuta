import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import {
  Settings,
  Home,
  Camera,
  TranslatedText,
  AudioRecording,
  LandmarkCamera,
  LandmarkScreen,
  LandmarkMap,
  ObjectCamera,
  ObjectScreen,
  RecentTranslations,
  Flashcards,
  InputText,
  CameraOptions,
} from "./components";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#d7837f",
    accent: "yellow",
    text: "000",
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerStyle: { backgroundColor: "#d7837f" } }}
            initialRouteName="Home"
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Camera" component={Camera} />
            <Stack.Screen name="Camera Options" component={CameraOptions} />
            <Stack.Screen name="TranslatedText" component={TranslatedText} />
            <Stack.Screen name="microphone" component={AudioRecording} />
            <Stack.Screen name="LandmarkCamera" component={LandmarkCamera} />
            <Stack.Screen name="LandmarkScreen" component={LandmarkScreen} />
            <Stack.Screen name="LandmarkMap" component={LandmarkMap} />
            <Stack.Screen name="ObjectCamera" component={ObjectCamera} />
            <Stack.Screen name="ObjectScreen" component={ObjectScreen} />
            <Stack.Screen name="Recents" component={RecentTranslations} />
            <Stack.Screen name="Flashcards" component={Flashcards} />
            <Stack.Screen name="Translate Text" component={InputText} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
