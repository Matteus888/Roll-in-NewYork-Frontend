import { StyleSheet } from "react-native";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import movie, { addMovie, removeAllMovies } from "./reducers/movies";
import user from "./reducers/users";
import favorite from "./reducers/favorites";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faHeart, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import ToastManager from "toastify-react-native";
import HomeScreen from "./screens/HomeScreen";
import FavouriteScreen from "./screens/FavouriteScreen";
import SearchScreen from "./screens/SearchScreen";
import LoginScreen from "./screens/LoginScreen";
import MemoriesScreen from "./screens/MemoriesScreen";
import ReviewsScreen from "./screens/ReviewsScreen";

const Tab = createBottomTabNavigator();

const store = configureStore({
  reducer: { user, movie, favorite },
});

export default function App() {
  return (
    <Provider store={store}>
      <ToastManager />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
}

function TabNavigator() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    dispatch(removeAllMovies());
    let allMoviesId = [];
    fetch("https://roll-in-new-york-backend.vercel.app/places/")
      .then((response) => response.json())
      .then((data) => {
        data.places.forEach((place) => {
          place.moviesList.forEach((movie) => {
            if (!allMoviesId.includes(movie)) {
              allMoviesId.push(movie);
            }
          });
        });
        allMoviesId.map((dataId) => {
          fetch(`https://api.themoviedb.org/3/movie/${dataId}?api_key=a98f87059c37903cc153947a91b8dd1c`)
            .then((response) => response.json())
            .then((data) => {
              if (data.original_title && data.poster_path) {
                dispatch(
                  addMovie({
                    id: dataId,
                    title: data.original_title,
                    poster_path: data.poster_path,
                    overview: data.overview,
                    release_date: data.release_date,
                  })
                );
              }
            });
        });
      });
  }, [dispatch]);

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
            case user.username === null ? "Login" : user.username:
              iconName = faUser;
              break;
          }

          return <FontAwesomeIcon style={styles.navIcon} icon={iconName} size={size} color={color} />;
        },
        tabBarStyle: styles.navbar,
        tabBarActiveTintColor: "#DEB973",
        tabBarInactiveTintColor: "#a39374",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
      <Tab.Screen name={user.username === null ? "Login" : user.username} component={LoginScreen} />
      <Tab.Screen name="Memories" component={MemoriesScreen} options={{tabBarButton: () => null}} />
      <Tab.Screen name="Reviews" component={ReviewsScreen} options={{tabBarButton: () => null}} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#001F3F",
  },
});
