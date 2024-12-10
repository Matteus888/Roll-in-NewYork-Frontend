// Réalisation des différents imports
import { StyleSheet } from "react-native";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native"; // Import pour la navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Import pour la navigation
import { Provider, useDispatch, useSelector } from 'react-redux'; // Import de react-redux
import { configureStore } from '@reduxjs/toolkit'; // import de configureStore
import place, { addMovie } from './reducers/places'; // Import du reducer place
import user from './reducers/users'; // Import du reducer user
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; // Import pour les icons
import { faHouse, faHeart, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons"; // Import pour les icons
import ToastManager from "toastify-react-native"; // Import pour les notifications
import HomeScreen from "./screens/HomeScreen"; // Import du composant HomeScreen.js
import FavouriteScreen from "./screens/FavouriteScreen"; // Import du composant FavouriteScreen.js
import SearchScreen from "./screens/SearchScreen"; // Import du composant SearchScreen.js
import LoginScreen from "./screens/LoginScreen"; // Import du composant LoginScreen.js

const Tab = createBottomTabNavigator(); // Création de la navigation en bas de l'écran

const store = configureStore({ // Création du store pour les recuders
  reducer: { user, place }, // Ajout des reducers user et place
});

export default function App() { 
  return (
    <Provider store={store}> {/* Mise en place du store */}
      <ToastManager /> {/* Mise en place du ToastManager pour les notifications */}
      <NavigationContainer> {/* Mise en place de la navigation */}
        <Navigation /> {/* Affichage des onglets de navigation (Fait appel à une autre fonction car il est pas possible de faire certaines actions directement dans la fonction App)*/}
      </NavigationContainer>
    </Provider>
  );
}

function Navigation() { // Fonction pour afficher les onglets de navigation
  const dispatch = useDispatch(); // Récupération de dispatch pour envoyer des actions dans le store
  const user = useSelector((state) => state.user.value); // Récupération de l'utilisateur

  useEffect(() => { // Récupération des films et ajout dans le store (place)
    let allMoviesId = [];
    fetch('https://roll-in-new-york-backend.vercel.app/places/') // Récupération des lieux présents dans la BDD
      .then((response) => response.json())
      .then((data) => {
        data.places.forEach((place) => { // Boucle pour dire que : 'À chaque lieux'
          place.moviesList.forEach((movie) => { // Boucle pour récupérer les films de chaque lieu
            if (!allMoviesId.includes(movie)) { // Si le film n'est pas déjà présent dans le tableau
              allMoviesId.push(movie); // Alors on l'ajoute dans le tableau
            }
          });
        });
        
        // Boucle pour récupérer les identifiants des films
        allMoviesId.map((dataId) => {
          fetch(`https://api.themoviedb.org/3/movie/${dataId}?api_key=a98f87059c37903cc153947a91b8dd1c`) // Récupération des données du film
            .then((response) => response.json())
            .then((data) => {
              if (data.original_title && data.poster_path) { // Vérifiez que les données sont valides (Au moin le titre et l'image)
                dispatch(addMovie({ // Ajout du film dans le store
                  id: dataId,
                  title: data.original_title,
                  poster_path: data.poster_path,
                  overview: data.overview,
                  release_date: data.release_date,
                }));
              }
            });
        });
      });
  }, [dispatch]); // Déclenchement de l'effet uniquement lors du premier rendu

  return (
    <Tab.Navigator // Mise en place des onglets de navigation
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => { // Mise en place des icons pour chaque onglet
          let iconName = "";

          switch (route.name) { // Switch pour dire que : 'Pour chaque onglet'
            case "Home": // Si l'onglet est 'Home'
              iconName = faHouse; // Alors on affiche l'icone de la maison
              break;
            case "Favourite": // Si l'onglet est 'Favourite'
              iconName = faHeart; // Alors on affiche l'icone du coeur
              break;
            case "Search": // Si l'onglet est 'Search'
              iconName = faMagnifyingGlass; // Alors on affiche l'icone de la loupe
              break;
            case (user.username === null ? "Login" : user.username): // Si l'utilisateur n'est pas connecté alors on affiche le nom d'onglet 'Login' sinon on affiche l'onglet avec le nom de l'utilisateur
              iconName = faUser; // On affiche l'icone de l'utilisateur
              break;
          }

          return <FontAwesomeIcon style={styles.navIcon} icon={iconName} size={size} color={color} />;
        },
        tabBarStyle: styles.navbar, // Style de la barre de navigation
        tabBarActiveTintColor: "#DEB973", // Couleur de l'icone et le texte si on est sur l'onglet
        tabBarInactiveTintColor: "#a39374", // Couleur de l'icone et le texte si on est pas sur l'onglet
        headerShown: false, // Désactivation de l'affichage du header
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} /> {/* Onglet 'Home' qui affiche le composant HomeScreen */}
      <Tab.Screen name="Favourite" component={FavouriteScreen} /> {/* Onglet 'Favourite' qui affiche le composant FavouriteScreen */}
      <Tab.Screen name="Search" component={SearchScreen} /> {/* Onglet 'Search' qui affiche le composant SearchScreen */}
      <Tab.Screen name={user.username === null ? "Login" : user.username} component={LoginScreen} /> {/* Onglet 'Login' qui affiche le composant LoginScreen */}
    </Tab.Navigator>
  );
}

// Style de la barre de navigation
const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#001F3F",
  },
});
