// Import pour react / react-native
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Linking, Platform } from "react-native"; // Import pour react / react-native
import { useEffect, useState } from "react"; // Import pour react
import { useSelector } from "react-redux"; // Import pour récupérer les données du store
import { useNavigation } from "@react-navigation/native";

import { Checkbox } from "react-native-paper";

import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import Header from "../components/Header";
import PlaceCard from "../components/PlaceCard";
import { usePlanDayContext, usePopupContext } from "../provider/AppProvider";

// Import des icons depuis cloudinary
const manWalking = "https://res.cloudinary.com/dtkac5fah/image/upload/v1733818367/appIcons/pctlnl7qs4esplvimxui.png";
const moviePlace = "https://res.cloudinary.com/dtkac5fah/image/upload/v1733818367/appIcons/csasdedxqkqyj29vzk36.png";

export default function FavouriteScreen() {
  const [placesLikedList, setPlacesLikedList] = useState(null); // État pour stocker la liste des lieux likés
  const [isLoading, setIsLoading] = useState(true); // Etat du chargement de
  const [checkBtn, setCheckBtn] = useState(false);
  const [checkedStates, setCheckedStates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [planBtnVisible, setPlanBtnVisible] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(null);
  const { setActivePopupId } = usePopupContext();
  const { isPlanDay, setIsPlanDay } = usePlanDayContext();

  const user = useSelector((state) => state.user.value);
  const favorite = useSelector((state) => state.favorite.value);
  const navigation = useNavigation();

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

  // Demande de permission pour récupérer la localisation de l'utilisateur
  useEffect(() => {
    (async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      const status = result?.status;

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
        });
      } else {
        console.log(status);
      }
    })();
  }, []);

  const goToMap = () => {
    if (placesLikedList && checkedStates.includes(true)) {
      const selectedPlaces = placesLikedList.filter((_, i) => checkedStates[i]);

      const originCoords = currentPosition
        ? { lat: currentPosition.latitude, lon: currentPosition.longitude }
        : {
            lat: 40.772087,
            lon: -73.973159,
          };

      // Fonction pour calculer la distance entre deux points (latitude/longitude)
      const calculateDistance = (coord1, coord2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371;
        const dLat = toRad(coord2.lat - coord1.lat);
        const dLon = toRad(coord2.lon - coord1.lon);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      };

      // Tri des lieux checkés en fonction de leur distance par rapport à la position initiale
      const sortedPlaces = selectedPlaces.sort(
        (a, b) => calculateDistance(originCoords, a.coords) - calculateDistance(originCoords, b.coords)
      );

      // Point de départ si géolocalisé ou pas
      const origin = currentPosition
        ? `${currentPosition.latitude},${currentPosition.longitude}`
        : `40.772087,-73.973159`;

      // Lieu le plus éloigné
      const destination = `${sortedPlaces[sortedPlaces.length - 1].coords.lat},${
        sortedPlaces[sortedPlaces.length - 1].coords.lon
      }`;

      // Etapes
      const waypoints = sortedPlaces
        .slice(0, -1) // On retire le dernier car c'est la destination
        .map((place) => `${place.coords.lat},${place.coords.lon}`)
        .join("|");

      // Lien Google Maps
      const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;

      Linking.openURL(url);
    } else {
      alert("Please select at least one place to generate a route.");
    }
  };

  // Check ou uncheck les boxs
  const toggleCheckbox = (index) => {
    const updatedStates = [...checkedStates];
    updatedStates[index] = !updatedStates[index];
    setCheckedStates(updatedStates);
  };

  // Affiche/Masque checkbox
  const handlePlanMyDay = () => {
    setCheckBtn(!checkBtn);
    setModalVisible(!modalVisible);
    setPlanBtnVisible(!planBtnVisible);
    isPlanDay ? setIsPlanDay(false) : setIsPlanDay(true);
    setActivePopupId(null);
  };

  // Affichage de la liste des lieux likés
  let content;
  if (isLoading) {
    content = <Text style={styles.textError}>Loading favorites ...</Text>;
  } else if (placesLikedList && placesLikedList.length > 0) {
    content = placesLikedList.map((place, i) => (
      <View style={styles.cardLine} key={`view-${i}`}>
        {checkBtn && (
          <View style={ Platform.OS === "ios" ? styles.checkboxContainer : null}>
            <Checkbox
              key={`checkbox-${i}`}
              status={checkedStates[i] ? "checked" : "unchecked"}
              onPress={() => toggleCheckbox(i)}
              style={styles.checkbox}
              color="#001F3F"
              uncheckedColor="#7B8794"
            />
          </View>
        )}

        <PlaceCard
          key={i}
          id={place._id}
          title={place.title}
          image={place.placePicture}
          description={place.overview}
          noteAverage={3}
          navigation={navigation}
        />
      </View>
    ));
  } else if (user.token) {
    content = <Text style={styles.textError}>No favorite places at the moment</Text>;
  } else {
    content = <Text style={styles.textError}>Connection required</Text>;
  }

  // Création des markers cochés sur la carte
  let placesMarker;
  if (placesLikedList && placesLikedList.length > 0) {
    placesMarker = placesLikedList
      .filter((_, i) => checkedStates[i])
      .map((place, i) => (
        <Marker
          key={i}
          coordinate={{ latitude: place.coords.lat, longitude: place.coords.lon }}
          image={moviePlace || null}
        />
      ));
  }

  // Gestion de la hauteur de la scrollview pour qu'elle reste accessible si modale ouverte
  const scrollViewHeight = !modalVisible ? "73.3%" : "31%";

  return (
    <View style={styles.container} >
      <Header title="My Favorites" showInput={false} />
      <View style={[styles.favouritesScreenContainer, { height: scrollViewHeight }]}>
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
                  goToMap();
                }}
              >
                <Text style={styles.txtButton}>Go to maps!</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => handlePlanMyDay()}>
                <Text style={styles.txtButton}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mapContainer}>
              <MapView
                initialRegion={{
                  latitude: 40.772087,
                  longitude: -73.973159,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}
                style={styles.map}
              >
                <Marker
                  // marker "en dur" pour localisation de l'utilisateur dans central park si pas à new york
                  coordinate={
                    currentPosition
                      ? {
                          latitude: currentPosition.latitude,
                          longitude: currentPosition.longitude,
                        }
                      : { latitude: 40.772087, longitude: -73.973159 }
                  }
                  image={manWalking || null}
                  style={{ width: 5, height: 5 }} // Ne fonctionne pas
                />
                {placesMarker}
              </MapView>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  favouritesScreenContainer: {
    marginTop: 200,
    paddingTop: 5,
    alignItems: "center",
  },
  modalBackground: {
    alignItems: "center",
    marginBottom: 50,
  },
  checkboxContainer: {
    backgroundColor: "white", // Couleur de fond pour mieux voir
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#001F3F",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
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
  mapContainer: {
    width: "100%",
    height: "66%",
    borderWidth: 1,
  },
  map: {
    flex: 1,
  },
});
