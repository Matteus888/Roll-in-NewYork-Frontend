// Import pour react / react-native
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from "react-native"; // Import pour react / react-native
import { useEffect, useState } from "react"; // Import pour react
import { useSelector } from "react-redux"; // Import pour récupérer les données du store
import { useNavigation } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";
import Header from "../components/Header"; // Import du composant Header.js
import PlaceCard from "../components/PlaceCard"; // Import du composant PlaceCard.js

// Création de la page Favoris
export default function FavouriteScreen() {
  const [placesLikedList, setPlacesLikedList] = useState(null); // État pour stocker la liste des lieux likés
  const [isLoading, setIsLoading] = useState(true);
  const [checkBtn, setCheckBtn] = useState(false);
  const [checkedStates, setCheckedStates] = useState([]);

  const user = useSelector((state) => state.user.value);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      console.log("user.token", user.token);
      if (user.token === null) {
        navigation.navigate("Login");
        return;
      }
    })();

    fetch(`https://roll-in-new-york-backend.vercel.app/favorites/places/${user.token}`) // Requête pour récupérer les lieux likés
      .then((response) => response.json())
      .then((data) => {
        const favoritePlaces = Array.isArray(data.favoritePlaces) ? data.favoritePlaces : []; // Vérifie si c'est un tableau
        setPlacesLikedList(data.favoritePlaces || null); // Stockage des lieux likés dans l'état placesLikedList
        setCheckedStates(Array(favoritePlaces.length).fill(false)); // Initialisation des états pour chaque case à cocher
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error during fetch data", err);
      });
  }, [user.token, navigation]);

  const toggleCheckbox = (index) => {
    const updatedStates = [...checkedStates]; // Copie de l'état actuel
    updatedStates[index] = !updatedStates[index]; // Inverser l'état de la case sélectionnée
    setCheckedStates(updatedStates); // Mise à jour des états de chaque checkbox
  };

  // Affiche/Masque checkbox
  const handlePlanMyDay = () => {
    setCheckBtn(!checkBtn);
  };

  let content;

  if (isLoading) {
    content = <Text style={styles.textError}>Loading favorites ...</Text>;
  } else if (placesLikedList && placesLikedList.length > 0) {
    content = placesLikedList.map((place, i) => (
      <View style={styles.cardLine} key={`view-${i}`}>
        {checkBtn && (
          <Checkbox
            key={`checkbox-${i}`}
            status={checkedStates[i] ? "checked" : "unchecked"}
            onPress={() => toggleCheckbox(i)}
            color="#001F3F"
          />
        )}

        <PlaceCard
          key={i}
          id={place._id}
          title={place.title}
          image={place.placePicture}
          description={place.overview}
          noteAverage={3}
        />
      </View>
    ));
  } else if (user.token) {
    content = <Text style={styles.textError}>No favorite places at the moment</Text>;
  } else {
    content = <Text style={styles.textError}>Connection required</Text>;
  }

  return (
    <View style={styles.container}>
      <Header title="My Favorites" showInput={false} />
      <View style={styles.favouritesScreenContainer}>
        {placesLikedList && placesLikedList.length > 0 && (
          <TouchableOpacity style={styles.button} onPress={() => handlePlanMyDay()}>
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
  textError: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: 600,
    color: "#282C37",
  },
  cardLine: {
    flexDirection: "row",
    alignItems: "center",
  },
});
