// Import pour react / react-native
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Platform, Modal } from "react-native"; // Import pour react / react-native
import { useEffect, useState } from "react"; // Import pour react
import { useSelector } from "react-redux"; // Import pour récupérer les données du store
import { useNavigation } from "@react-navigation/native";
import { Checkbox } from "react-native-paper";
import Header from "../components/Header"; // Import du composant Header.js
import PlaceCard from "../components/PlaceCard"; // Import du composant PlaceCard.js
import { KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";

// Création de la page Favoris
export default function FavouriteScreen() {
  const [placesLikedList, setPlacesLikedList] = useState(null); // État pour stocker la liste des lieux likés
  const [isLoading, setIsLoading] = useState(true);
  const [checkBtn, setCheckBtn] = useState(false);
  const [checkedStates, setCheckedStates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [planBtnVisible, setPlanBtnVisible] = useState(true);

  const user = useSelector((state) => state.user.value);
  const favorite = useSelector((state) => state.favorite.value);
  const navigation = useNavigation();

  console.log(favorite);
  useEffect(() => {
    // Redirection vers la page login si on n'est pas connecté
    (async () => {
      if (user.token === null) {
        navigation.navigate("Login");
        return;
      }
    })();
    // Requête pour récupérer les lieux likés
    fetch(`https://roll-in-new-york-backend.vercel.app/favorites/places/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        const favoritePlaces = Array.isArray(data.favoritePlaces) ? data.favoritePlaces : []; // Vérifie si c'est un tableau
        setPlacesLikedList(data.favoritePlaces || null); // Stockage des lieux likés dans l'état placesLikedList
        setCheckedStates(Array(favoritePlaces.length).fill(false)); // Initialisation des états pour chaque case à cocher
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error during fetch places data : ", err);
      });
  }, [user.token, favorite, navigation]);

  // Check ou uncheck les boxs
  const toggleCheckbox = (index) => {
    const updatedStates = [...checkedStates]; // Copie de l'état actuel
    updatedStates[index] = !updatedStates[index]; // Inverser l'état de la case sélectionnée
    setCheckedStates(updatedStates); // Mise à jour des états de chaque checkbox
  };

  // Affiche/Masque checkbox
  const handlePlanMyDay = () => {
    setCheckBtn(!checkBtn);
    setModalVisible(!modalVisible);
    setPlanBtnVisible(!planBtnVisible);
  };

  let content;

  // Affichage de la liste des lieux likés
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
            style={styles.checkbox}
            color="#001F3F"
            uncheckedColor="#282C37"
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

  const dynamicHeight = !modalVisible ? "73.3%" : "31%";

  return (
    <View style={styles.container}>
      <Header title="My Favorites" showInput={false} />
      <View style={[styles.favouritesScreenContainer, { height: dynamicHeight }]}>
        {placesLikedList && placesLikedList.length > 0 && planBtnVisible && (
          <TouchableOpacity style={styles.button} onPress={() => handlePlanMyDay()}>
            <Text style={styles.txtButton}>Plan my day !</Text>
          </TouchableOpacity>
        )}
        <ScrollView showsVerticalScrollIndicator={false}>{content}</ScrollView>
      </View>

      {modalVisible && (
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.txtButton}>Go to maps!</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => handlePlanMyDay()}>
                <Text style={styles.txtButton}>X</Text>
              </TouchableOpacity>
            </View>
            <View>{/* Mapview */}</View>
          </View>
        </View>
      )}
    </View>
  );
}

// Définition du style des différents éléments
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  favouritesScreenContainer: {
    // flex: 1,
    marginTop: 200,
    paddingTop: 5,
    alignItems: "center",
  },
  modalBackground: {
    alignItems: "center",
    marginBottom: 50,
  },
  modalView: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    width: "95%",
    height: "77%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderColor: "#282C37",
    borderWidth: 2,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    height: "10%",
  },
  button: {
    backgroundColor: "#001F3F",
    width: 100,
    height: 30,
    borderRadius: 20,
    justifyContent: "center",
  },
  txtButton: {
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
  checkbox: {
    width: 24,
    height: 24,
  },
  textButton: {
    color: "#DEB973",
    textAlign: "center",
  },
  closeButton: {
    height: 30,
    width: 30,
    marginLeft: 70,
    backgroundColor: "#001F3F",
    borderRadius: 20,
    justifyContent: "center",
  },
});
