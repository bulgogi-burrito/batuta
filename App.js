import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import {
  Settings,
  Home,
  Camera,
  TranslatedText,
  Text,
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
import {
  DefaultTheme,
  Headline,
  Provider as PaperProvider,
  Title,
} from "react-native-paper";
const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#d7837f",
    accent: "yellow",
    text: "black",
  },
};

export default function App() {
  // const navigation = useNavigation();
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerStyle: { backgroundColor: "#d7837f" } }}
            initialRouteName="Home"
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: () => <Headline>b a t u t a</Headline>,
              }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
                headerTitle: () => <Title>Settings</Title>,
              }}
              headerBackTitle="Back"
            />
            <Stack.Screen
              name="Camera"
              component={Camera}
              options={{ headerBackTitle: "Home" }}
            />
            <Stack.Screen name="Camera Options" component={CameraOptions} />
            <Stack.Screen
              name="TranslatedText"
              options={{
                headerTitle: () => <Title>Translated Text</Title>,
              }}
              component={TranslatedText}
            />
            <Stack.Screen name="LandmarkCamera" component={LandmarkCamera} />
            <Stack.Screen
              name="LandmarkScreen"
              options={{
                headerBackTitle: "Back",
                headerTitle: () => <Title>Landmark Detected</Title>,
              }}
              component={LandmarkScreen}
            />
            <Stack.Screen name="LandmarkMap" component={LandmarkMap} />
            <Stack.Screen
              name="ObjectCamera"
              options={{
                headerTitle: () => <Title>Object Camera</Title>,
              }}
              component={ObjectCamera}
            />
            <Stack.Screen
              name="ObjectScreen"
              options={{
                headerTitle: () => <Title>Object Detected</Title>,
              }}
              component={ObjectScreen}
            />
            <Stack.Screen name="Recents" component={RecentTranslations} />
            <Stack.Screen name="Flashcards" component={Flashcards} />
            <Stack.Screen name="Translate Text" component={InputText} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
