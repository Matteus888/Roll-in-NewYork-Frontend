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

// Création d'une constant 'Tab' qui prend pour fonction createBottomTabNavigator de la librairie '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator();

// Création de la fonction principale du frontend
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // ????
          tabBarIcon: ({ color, size }) => {
            let iconName = "";

            //Définition de l'icon en fonction de l'onglet
            switch (route.name) {
              case "Home":
                // Si l'onglet est 'Home' l'icon doit être 'house'
                iconName = faHouse;
                break;
              case "Favourite":
                // Si l'onglet est 'Favourite' l'icon doit être 'heart'
                iconName = faHeart;
                break;
              case "Search":
                // Si l'onglet est 'Search' l'icon doit être 'magnifying-glass'
                iconName = faMagnifyingGlass;
                break;
              case "Login":
                // Si l'onglet est 'Login' l'icon doit être 'user'
                iconName = faUser;
                break;
            }

            // Renvoi à tabBarIcon l'icon à mettre en fonction de l'onglet
            return <FontAwesomeIcon style={styles.navIcon} icon={iconName} size={size} color={color} />;
          },
          //Définition du style de la NavBar
          tabBarStyle: styles.navbar,
          //Définition de la couleur des icons à '#DEB973' peut importe si on est dessus ou pas
          tabBarActiveTintColor: "#DEB973",
          tabBarInactiveTintColor: "#a39374",
          //Définition à 'false' l'affichage du header de '@react-navigation/bottom-tabs'
          headerShown: false,
          scrollEnabled: true,
        })}
      >
        {/* Création des différents onglets en bas de l'écran avec les redirections */}
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Favourite" component={FavouriteScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#001F3F",
  },
});
