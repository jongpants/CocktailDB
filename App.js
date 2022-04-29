import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Register from "./Components/Register";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import List from "./Components/List";
import FavouriteList from "./Components/FavouriteList";
import DrinkDetail from "./Components/DrinkDetail";

const Tab = createBottomTabNavigator();

export default function App(navigation) {
  const hide = ["DrinkDetail", "Login", "Register", "Logout", "Favourites"];
  console.disableYellowBox = true;

  // -- Login, Register, Logout, and Favourites are not being used --
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
          tabBarHideOnKeyboard: false,
          tabBarActiveTintColor: "#3944BC",

          tabBarButton: hide.includes(route.name) ? () => null : undefined,
          tabBarStyle: { display: "none" },
          /*
            route.name === "DrinkDetail"
              ? { display: "none" }
              : route.name === "Login"
              ? { display: "none" }
              : route.name === "Register"
              ? { display: "none" }
              : route.name === "Logout"
              ? { display: "none" }
              : { display: "flex" },
              */
        })}
      >
        <Tab.Screen name="List" component={List} />
        <Tab.Screen name="Favourites" component={FavouriteList} />
        <Tab.Screen name="DrinkDetail" component={DrinkDetail} />
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Register" component={Register} />
        <Tab.Screen name="Logout" component={Logout} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
