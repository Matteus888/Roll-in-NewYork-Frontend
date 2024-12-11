// Import pour react / react-native
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Text,
} from "react-native"; // Import pour react / react-native
import { useEffect, useState } from "react"; // Import pour react
import { useSelector } from "react-redux"; // Import pour récupérer les données du store
import Header from "../components/Header"; // Import du composant Header.js
import PlaceCard from "../components/PlaceCard"; // Import du composant PlaceCard.js

// Création de la page Favoris
export default function FavouriteScreen() {
    const [placesLikedList, setPlacesList] = useState([]); // État pour stocker la liste des lieux likés

    const user = useSelector((state) => state.user.value);
    console.log(user);

    useEffect(() => {
        fetch(
            `https://roll-in-new-york-backend.vercel.app/favorites/places/${user.token}`
        ) // Requête pour récupérer les lieux likés
            .then((response) => response.json())
            .then((data) => {
                setPlacesList(data.favoritePlaces); // Stockage des lieux likés dans l'état placesLikedList
            });
    }, []);

    const placesLiked = placesLikedList.map((place, i) => {
        // Boucle pour afficher les lieux likés
        return (
            // Il manque la moyenne des avis venant des reviews
            <PlaceCard
                key={i}
                title={place.title}
                image={place.placePicture}
                description={place.overview}
                noteAverage={3}
            />
        );
    });

    return (
        <View style={styles.container}>
            <Header title="My Favorites" showInput={false} />
            <View style={styles.favouritesScreenContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>Plan my day !</Text>
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {placesLiked}
                </ScrollView>
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
});
