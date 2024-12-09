// Import des différents compostants / fonctions des différentes librairies
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faHeart, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
// Import des différentes pages ./screens
import HomeScreen from "./screens/HomeScreen";
import FavouriteScreen from "./screens/FavouriteScreen";
import SearchScreen from "./screens/SearchScreen";
import LoginScreen from "./screens/LoginScreen";
import { StyleSheet } from "react-native";
// Import des différents élément pour mettre en place le store redux
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/users';

import ToastManager from "toastify-react-native";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// Création d'une constant 'Tab' qui prend pour fonction createBottomTabNavigator de la librairie '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator();

const store = configureStore({
  reducer: { user },
})

// Création de la fonction principale du frontend
export default function App() {
  return (
    <Provider store={store}>
      <ToastManager />
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </Provider>
  );
}

function MainTabs() {
  const user = useSelector((state) => state.user.value);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          switch (route.name) {
            case "Home":
              iconName = faHouse;
              break;
            case "Favourite":
              iconName = faHeart;
              break;
            case "Search":
              iconName = faMagnifyingGlass;
              break;
            case (user.username === null ? "Login" : user.username):
              iconName = faUser;
              break;
          }

          return <FontAwesomeIcon style={styles.navIcon} icon={iconName} size={size} color={color} />;
        },
        tabBarStyle: styles.navbar,
        tabBarActiveTintColor: "#DEB973",
        tabBarInactiveTintColor: "#a39374",
        headerShown: false,
        scrollEnabled: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name={user.username === null ? "Login" : user.username} component={LoginScreen} />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#001F3F",
  },
});
