// Import pour react / react-native
import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateUser } from "../reducers/users";

// Import des composants
import Header from "../components/Header";
import PlaceCard from "../components/PlaceCard";

// Création de la page Favoris
export default function FavouriteScreen() {
  const [placesLikedList, setPlacesList] = useState([]);

  const user = useSelector((state) => state.user.value);
  console.log(user);

  useEffect(() => {
    fetch("http://localhost:3000/favorites/places/pzCyWVJ77-oU9IRSf5sNZM8P-99e0rMY")
      .then((response) => response.json())
      .then((data) => {
        setPlacesList(data.favoritesPlaces);
        console.log(data);
      });
  }, []);

  const placesLiked = placesLikedList.map((place, i) => {
    return <PlaceCard key={i} title={place.title} image={place.placePicture} description={place.overview} />;
  });

  return (
    <View style={styles.container}>
      <Header title="My Favorites" showInput={false} />
      <View style={styles.favouritesScreenContainer}>{placesLiked}</View>
    </View>
  );
}

// Définition du style des différents éléments
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  favouritesScreenContainer: {
    flex: 1,
    marginTop: 200,
    paddingTop: 5,
    alignItems: "center",
  },
});
