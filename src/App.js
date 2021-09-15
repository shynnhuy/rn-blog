import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Provider } from "./context/BlogContext";
import { IndexScreen } from "./screens/IndexScreen";
import { NavigationContainer } from "@react-navigation/native";
import { ShowScreen } from "./screens/ShowScreen";
import { CreateScreen } from "./screens/CreateScreen";
import { EditScreen } from "./screens/EditScreen";

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen component={IndexScreen} name="Index" />
          <Stack.Screen component={ShowScreen} name="Show" />
          <Stack.Screen component={CreateScreen} name="Create" />
          <Stack.Screen component={EditScreen} name="Edit" />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
};
