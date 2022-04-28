import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Register from "./Components/Register";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Pressable,
  Picker,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  View,
} from "react-native";
import List from "./Components/List";
import { useNavigation } from "@react-navigation/native";
import FavouriteList from "./Components/FavouriteList";
import DrinkDetail from "./Components/DrinkDetail";

const Tab = createBottomTabNavigator();

export default function App(navigation) {
  //const hide = ["Login", "Register"];
  const hide = ["DrinkDetail"];
  console.disableYellowBox = true;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "List") {
              iconName = "md-home";
            } else if (route.name === "Favourites") {
              iconName = "md-star";
            }
            /*
            else if (route.name === "Logout") {
              iconName = "exit-outline";
            }
            */
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: "#3944BC",

          tabBarButton: hide.includes(route.name) ? () => null : undefined,
          tabBarStyle:
            route.name === "DrinkDetail"
              ? { display: "none" }
              : { display: "flex" },

          /*
              <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Register" component={Register} />
        <Tab.Screen name="Logout" component={Logout} />
              */
        })}
      >
        <Tab.Screen name="List" component={List} />
        <Tab.Screen name="Favourites" component={FavouriteList} />
        <Tab.Screen name="DrinkDetail" component={DrinkDetail} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
