import { StyleSheet, Dimensions, View, TouchableOpacity, Text, SafeAreaView } from "react-native";
import PlaceCard from "../components/PlaceCard";
import Header from "../components/Header";
import { useState } from "react";
import MemoriesCamera from "../components/Camera";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; // Import pour les icons
import { faCamera, faUpload } from "@fortawesome/free-solid-svg-icons"; // Import pour les icons

export default function MemoriesScreen({route, navigation}) {
    
    const [isPicture, setIsPicture] = useState(false);
    console.log(route.params.selectedPlace.id)

    const { selectedPlace } = route.params;
    const movieCard = (
      <PlaceCard
        id={selectedPlace.id}
        title={selectedPlace.title}
        image={selectedPlace.image}
        description={selectedPlace.description}
      ></PlaceCard>
    );

    const handleCameraClose = () => {
        setIsPicture(false); // Réinitialiser isPicture à false lorsque la caméra est fermée
    };
      
    return (
        isPicture ? (
          <MemoriesCamera 
            idPlace={route.params.selectedPlace.id} 
            navigation={navigation} 
            onClose={handleCameraClose} // Passer la fonction pour réinitialiser
          />
        ) : (
          <View style={styles.container}>
            <Header title="Memories" showInput={false} />
            <View style={styles.memoriesContainer}>
              {movieCard}
              <View style={styles.buttonPictures}>
                <TouchableOpacity style={styles.buttonUpload} onPress={() => console.log('upload')}>
                  <FontAwesomeIcon icon={faUpload} size={35} color="#DEB973" />
                </TouchableOpacity>
                <View style={styles.buttonPictureSeparator}></View>
                <TouchableOpacity style={styles.buttonPicture} onPress={() => setIsPicture(true)}>
                  <FontAwesomeIcon icon={faCamera} size={40} color="#DEB973" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
    );
}

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
    }
});