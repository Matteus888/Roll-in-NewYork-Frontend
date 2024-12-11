// Réalisation des différents imports
import { useState } from "react"; // Import pour react
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    FlatList,
} from "react-native"; // Import pour react-native
import { useSelector } from "react-redux"; // Import pour récupérer les données du store
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; // Import pour les icons
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; // Import pour les icons

export default function SearchInput() {
    const [filteredMovie, setFilteredMovie] = useState([]); // État pour stocker les résultats
    const [showPopup, setShowPopup] = useState(false); // État pour contrôler l'affichage de la pop-up
    const movie = useSelector((state) => state.movie.value); // Récupération des données du store place

    const searchMovies = (searchValue) => {
        // Fonction pour rechercher les films
        const hashtagPattern = new RegExp(`${searchValue}`, "i"); // Variable qui permet de faire une recherche en equalsIgnoreCase en fonction de la valeur de la recherche
        const results = movie.filter((movie) =>
            movie.title.match(hashtagPattern)
        ); // Récupération des résultats en fonction de la recherche
        setFilteredMovie(results); // Mise à jour des résultats
        setShowPopup(searchValue.length > 0 && results.length > 0); // Afficher la pop-up seulement s'il y a des résultats
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Search for a movie..."
                    placeholderTextColor="#DEB973"
                    style={styles.input}
                    onChangeText={(value) => searchMovies(value)}
                />
                <TouchableOpacity>
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        size={20}
                        color="#DEB973"
                        style={styles.iconeSearch}
                    />
                </TouchableOpacity>
            </View>
            {showPopup && ( // Affichage de la pop-up si showPopup est à true
                <View style={styles.popup}>
                    <FlatList
                        data={filteredMovie}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Text style={styles.popupItem}>{item.title}</Text>
                        )}
                        onPress={() => setShowPopup(false)}
                    />
                </View>
            )}
        </View>
    );
}

// Définition du style des différents éléments
const styles = StyleSheet.create({
    container: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderColor: "#DEB973",
        borderWidth: 2,
        borderRadius: 20,
        width: "100%",
        marginTop: 10,
        paddingLeft: 15,
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: "white",
        fontSize: 16,
        color: "#282C37",
        paddingLeft: 10,
        paddingRight: 10,
    },
    iconeSearch: {
        marginRight: 10,
    },
    popup: {
        position: "absolute",
        top: 50,
        backgroundColor: "white",
        borderColor: "#DEB973",
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        width: "100%",
        maxHeight: 150,
        zIndex: 1000,
    },
    popupItem: {
        fontSize: 14,
        color: "#282C37",
        paddingVertical: 5,
    },
});
