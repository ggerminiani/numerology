import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Baby from "../screens/Baby";
import Main from "../screens/Main";
import Phrases from "../screens/Phrases";

const Routes = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={false}>
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="Baby" component={Baby} />
        <Stack.Screen name="Phrases" component={Phrases} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
