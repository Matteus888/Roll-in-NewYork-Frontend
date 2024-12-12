import { StyleSheet, Dimensions, View, TouchableOpacity, Text, SafeAreaView } from "react-native";
import PlaceCard from "../components/PlaceCard";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; // Import pour les icons
import { faCamera, faUpload } from "@fortawesome/free-solid-svg-icons"; // Import pour les icons
import MasonryList from "react-native-masonry-list";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function MemoriesScreen({route, navigation}) {
    const user = useSelector((state) => state.user.value);
    const [pictures, setPictures] = useState([]);

    const { selectedPlace } = route.params;
    const movieCard = (
      <PlaceCard
        id={selectedPlace.id}
        title={selectedPlace.title}
        image={selectedPlace.image}
        description={selectedPlace.description}
      ></PlaceCard>
    );
    
    useEffect(() => {
        setPictures([]);
        console.log('userToken', user.token);
        console.log('selectedPlace.id', selectedPlace.id);
        (async () => {
            try {
                fetch(`https://roll-in-new-york-backend.vercel.app/favorites/pictures/${user.token}/${selectedPlace.id}`)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('data', data);
                            // Préparez toutes les images avant de mettre à jour l'état
                            const newPictures = data.urls.map((url) => ({ uri: url }));
                            setPictures(newPictures); // Une seule mise à jour de l'état
                    });
            } catch (err) {
                console.error('Error fetching memories:', err);
            }
        })();
    }, [route.params.selectedPlace.id, user.token]);
    

    const handleCamera = () => {
        const selectedPlace = {id: route.params.selectedPlace.id, title: route.params.selectedPlace.title, image: route.params.selectedPlace.image, description: route.params.selectedPlace.description};
        navigation.navigate('Camera', {selectedPlace, navigation});
    }
    
    return (
        <View style={styles.container}>
          <Header title="Memories" showInput={false} />
          <View style={styles.memoriesContainer}>
            {movieCard}
            <View style={styles.buttonPictures}>
              <TouchableOpacity style={styles.buttonUpload} onPress={() => console.log('upload')}>
                <FontAwesomeIcon icon={faUpload} size={35} color="#DEB973" />
              </TouchableOpacity>
              <View style={styles.buttonPictureSeparator}></View>
              <TouchableOpacity style={styles.buttonPicture} onPress={() => handleCamera()}>
                <FontAwesomeIcon icon={faCamera} size={40} color="#DEB973" />
              </TouchableOpacity>
            </View>
            <View style={styles.gallery}>
                <MasonryList
                    images={pictures}
                    columns={2} // Nombre de colonnes
                    spacing={5} // Espacement entre les images
                    backgroundColor={"#EFEFEF"} // Couleur de fond
                    style={{ backgroundColor: "#EFEFEF" }} // Style de la liste 
                />
            </View>
          </View>
        </View>
    );
};

// Définition du style des différents éléments
const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        backgroundColor: "#EFEFEF",
    },
    memoriesContainer: {
        flex: 1,
        marginTop: 200,
        paddingTop: 5,
        alignItems: "center",
    },
    buttonPictures: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 40,
        backgroundColor: "#001F3F",
        width: Dimensions.get("window").width - 80,
        height: "10%",
        borderRadius: 50,
    },
    buttonPictureSeparator: {
        height: "100%",
        width: "1.5%",
        backgroundColor: "#DEB973",
    },
    buttonPicture: {
        marginRight: 60,
    },
    buttonUpload: {
        marginLeft: 60,
    },
    gallery: {
        marginTop: 20,
        width: '100%',
        height: '50%',
    }
});