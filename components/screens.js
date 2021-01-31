import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import settings from "./settings";

const SetttingStack = createStackNavigator({
  Settings: settings,
});



