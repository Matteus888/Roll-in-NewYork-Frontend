// Réalisation des différents imports
import { View, StyleSheet, Text, Modal, TouchableOpacity, ScrollView } from "react-native"; // Import pour react-native
import { useState, useEffect } from "react"; // Import pour react
import { Marker } from "react-native-maps"; // Import pour la carte
import MapView from "react-native-maps"; // Import pour la map
import Header from "../components/Header"; // Import du composant Header.js
import MovieCard from "../components/MovieCard"; // Import du composant MovieCard.js
import {useSelector} from "react-redux"; // Import pour récupérer les données du store

// Import des icons depuis cloudinary
const manWalking = "https://res.cloudinary.com/dtkac5fah/image/upload/v1733818367/appIcons/pctlnl7qs4esplvimxui.png";
const moviePlace = "https://res.cloudinary.com/dtkac5fah/image/upload/v1733818367/appIcons/csasdedxqkqyj29vzk36.png";

export default function HomeScreen({navigation}) {
    const [places, setPlaces] = useState([]); // Initiation du tableau de lieux à afficher sur la carte
    const [currentPosition, setCurrentPosition] = useState(null); // Initiation des coordonnées de localisation de l'utilisateur
    const [modalVisible, setModalVisible] = useState(false) // Initiation de la modale pour afficher les informations du lieu
    const [placeMovies, setPlaceMovies] = useState([]) // Initiation du tableau de films du lieu
    const [movieData, setMovieData] = useState() // Initiation des données du film
    // récupération des infos de tout les films depuis le reducer
    const moviesInfo = useSelector((state)=> state.place.value)
    const [movieInfo, setMovieInfo] = useState({})

    // Demande de permission pour récupérer la localisation de l'utilisateur
    useEffect(() => {
        (async () => {
            const result = await Location.requestForegroundPermissionsAsync(); // Demande de permission pour la localisation
            const status = result?.status; // Récupération du statut de la permission

            if (status === "granted") { // Si la permission est accordée alors on récupère la localisation de l'utilisateur
                Location.watchPositionAsync(
                    { distanceInterval: 10 },
                    (location) => {
                        setCurrentPosition(location.coords);
                    }
                );
            }
        })();
        // Mise en place du fetch pour récupérer les lieux et les afficher sur la carte
        fetch("https://roll-in-new-york-backend.vercel.app/places")
            .then((response) => response.json())
            .then((data) => {
                setPlaces(data.places);
            });
    }, []);

    // Mise en place des markers pour afficher les lieux sur la carte
    const placesMarker = places.map((data, i) => {
        return (
            <Marker
                key={i}
                coordinate={{
                    latitude: data.coords.lat,
                    longitude: data.coords.lon,
                }}
                title={data.title}
                description={data.address}
                image={moviePlace || null}
                onPress={()=> {
                    handleMarkerPressed() 
                    setPlaceMovies(data.moviesList)
                }}
            >
            </Marker>
        );
    });


    const handleMarkerPressed = () => {
        setModalVisible(true)   
    }

    // pour afficher les films au click sur un lieu
    const movieCards = placeMovies.map((data, i)=> {
        for (let j=0; j<moviesInfo.length; j++){
            if (moviesInfo[j].id === data){
                console.log(moviesInfo[j].id)
                
                return (
                    <TouchableOpacity key={`movieCardId: ${i}`} info= {movieInfo} onPress={()=> {
                        setMovieInfo(moviesInfo[j])
                        console.log('test', movieInfo)
                        navigation.navigate("Search", {movieInfo})
                        }} >
                        <MovieCard 
                        title={moviesInfo[j].title} 
                        poster={moviesInfo[j].poster_path} 
                        overview={moviesInfo[j].overview} 
                        date={moviesInfo[j].release_date}
                        ></MovieCard>
                    </TouchableOpacity>
                )
            }
        }
})


  return (
    <View style={styles.container}>
      <View>
        <Header title="Roll-In NewYork" showInput={true} />
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <View style={styles.buttonContainer} >
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.textButton}>Go to maps!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.textButton}>X</Text>
            </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <ScrollView >
                {movieCards}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.mapContainer}>
        <MapView
          // force la map à se recharger si changement dans le fetch, évite la disparition des marker
          // la key est une string avec un identifiant "map" pour le différencier des key "i" dans le place.map
          key={`map-${places.length}`}
          // focus au dessus de central park
          initialRegion={{
            latitude: 40.7857122,
            longitude: -73.9745249,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          style={styles.map}
        >
          <Marker
            // marker "en dur" pour localisation de l'utilisateur dans central park si pas à new york
            coordinate={{
              latitude: 40.772087,
              longitude: -73.973159,
            }}
            image={manWalking || null}
          />
          {placesMarker}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
  },
  mapContainer: {
    width: "100%",
    height: "75%",
    marginTop: 200,
  },
  map: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50,
  },
  modalView: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    width: "95%",
    height: "45%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderColor: "#282C37",
    borderWidth: 2,
    padding: 10,
  },
  button: {
    backgroundColor: "#001F3F",
    width: "30%",
    height: "10%",
    borderRadius: 20,
    justifyContent: "center",
  },
  textButton: {
    color: "#DEB973",
    textAlign: "center",
  },
  placePicture: {
    height: 50,
    width: 100,
  },
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "flex-start",
    },
    mapContainer: {
        width: "100%",
        height: "75%",
        marginTop: 200,
    },
    map: {
        flex: 1,
    },
    modalBackground: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 50
    },
    modalView:{
        flexDirection: 'column',
        justifyContent:'flex-start',
        alignItems: 'center',
        backgroundColor: "white",
        width: "95%",
        height: "45%",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderColor: "#282C37",
        borderWidth: 2,
        padding: 10
    },
    buttonContainer:{
        flexDirection: 'row',
        alignItems:'center',
        height: "10%",
        marginBottom: 10
    },
    button:{
        backgroundColor: "#001F3F",
        width: "30%",
        height: "100%",
        borderRadius: 20,
        justifyContent: "center",

    },
    closeButton:{
        height: 30,
        width:30,
        marginLeft: 70,
        backgroundColor:'#001F3F',
        borderRadius: 20,
        justifyContent: "center",

    },

    placePicture:{
        height: 50,
        width: 100,
    },


});
