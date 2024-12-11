// Import pour react / react-native
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from "react-native"; // Import pour react / react-native
import { useEffect, useState } from "react"; // Import pour react
import { useSelector } from "react-redux"; // Import pour récupérer les données du store
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header"; // Import du composant Header.js
import PlaceCard from "../components/PlaceCard"; // Import du composant PlaceCard.js

// Création de la page Favoris
export default function FavouriteScreen() {
  const [placesLikedList, setPlacesLikedList] = useState(null); // État pour stocker la liste des lieux likés
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.user.value);
  const navigation = useNavigation();

  useEffect(() => {
    if (!user || !user.token) {
      navigation.navigate("Login");
      return;
    }

    fetch(`https://roll-in-new-york-backend.vercel.app/favorites/places/${user.token}`) // Requête pour récupérer les lieux likés
      .then((response) => response.json())
      .then((data) => {
        setPlacesLikedList(data.favoritePlaces || null); // Stockage des lieux likés dans l'état placesLikedList
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error during fetch data", err);
      });
  }, [user, navigation]);

  let content;

  if (isLoading) {
    content = <Text style={styles.textNoFavAdded}>Loading favorites ...</Text>;
  } else if (placesLikedList && placesLikedList.length > 0) {
    content = placesLikedList.map((place, i) => (
      <PlaceCard key={i} title={place.title} image={place.placePicture} description={place.overview} noteAverage={3} />
    ));
  } else {
    content = <Text style={styles.textNoFavAdded}>No favorite places at the moment</Text>;
  }

  return (
    <View style={styles.container}>
      <Header title="My Favorites" showInput={false} />
      <View style={styles.favouritesScreenContainer}>
        {placesLikedList && placesLikedList.length > 0 && (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Plan my day !</Text>
          </TouchableOpacity>
        )}
        <ScrollView showsVerticalScrollIndicator={false}>{content}</ScrollView>
      </View>
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
  button: {
    backgroundColor: "#001F3F",
    width: "30%",
    height: "5%",
    borderRadius: 20,
    justifyContent: "center",
    marginBottom: 8,
  },
  textButton: {
    color: "#DEB973",
    textAlign: "center",
    fontWeight: 600,
  },
  textNoFavAdded: {
    marginTop: 80,
    fontSize: 24,
  },
});
