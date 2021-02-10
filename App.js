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

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerStyle: { backgroundColor: "#d7837f" } }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="CameraOptions" component={CameraOptions} />
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
    </Provider>
  );
}
