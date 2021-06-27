import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/Home";
import { AppointmentDetails } from "../screens/AppointmentDetails";
import { AppointmentCreation } from "../screens/AppointmentCreation";

import { theme } from "../global/styles/theme";
import { Guilds } from "../screens/Guilds";

const AuthStack = createStackNavigator();
// const {Navigator, Screen} = createStackNavigator();

export function AppRoutes() {
  return (
    <AuthStack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors.secondary100,
        },
      }}
    >
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen
        name="AppointmentDetails"
        component={AppointmentDetails}
      />
      <AuthStack.Screen
        name="AppointmentCreation"
        component={AppointmentCreation}
      />
      <AuthStack.Screen name="Guilds" component={Guilds} />
    </AuthStack.Navigator>
  );
}
