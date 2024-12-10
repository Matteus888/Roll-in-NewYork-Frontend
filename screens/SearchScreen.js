// Réalisation des différents imports
import {
    StyleSheet,
    View,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from "react-native"; // Import pour react / react-native
import { useState } from "react"; // Import pour react
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; // Import pour les icons
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons"; // Import pour les icons
import Header from "../components/Header"; // Import du composant Header
import PlaceCard from "../components/PlaceCard"; // Import du composant PlaceCard
import MovieCard from "../components/MovieCard"; // Import du composant MovieCard

const { width } = Dimensions.get("window"); // Récupération de la largeur de l'écran du téléphone

export default function SearchScreen(route) {
    // récupération des info du film cliqué en page d'accueil
    // const {movieInfo} = route.params.movieInfo
    console.log(route);

    const [currentIndex, setCurrentIndex] = useState(0); // État pour stocker l'index de la card lieux actuelle

    const cardsData = [
        // Tableau contenant les données du caroussel (TEMPORAIRE)
        {
            id: "1",
            image: "https://via.placeholder.com/300x200.png?text=Image+1",
            title: "Lieu 1",
            description: "Description de la première carte.",
        },
        {
            id: "2",
            image: "https://via.placeholder.com/300x200.png?text=Image+2",
            title: "Lieu 2",
            description: "Description de la deuxième carte.",
        },
        {
            id: "3",
            image: "https://via.placeholder.com/300x200.png?text=Image+3",
            title: "Lieu 3",
            description: "Description de la troisième carte.",
        },
    ];

    // Fonction pour passer à la card du lieu suivant
    const goToNext = () => {
        const nextIndex = (currentIndex + 1) % cardsData.length;
        setCurrentIndex(nextIndex);
    };

    // Fonction pour passer à la card du lieu précédent
    const goToPrevious = () => {
        const prevIndex =
            (currentIndex - 1 + cardsData.length) % cardsData.length;
        setCurrentIndex(prevIndex);
    };

    return (
        <>
            <View style={styles.container}>
                <Header title="Roll-In NewYork" showInput={true} />
                <View style={styles.searchScreenContainer}>
                    <MovieCard />
                    <View style={styles.carouselWrapper}>
                        <TouchableOpacity
                            onPress={goToPrevious}
                            style={styles.navigationButtonLeft}
                        >
                            <FontAwesomeIcon
                                icon={faChevronLeft}
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>
                        <FlatList // Affichage du carrousel
                            data={cardsData}
                            horizontal // Indication de l'affichage horizontal
                            renderItem={(
                                { item, index } // Affichage des éléments du carrousel
                            ) =>
                                index === currentIndex ? ( // Si l'index de l'élément est égal à l'index actuel alors on affiche la card
                                    <View style={styles.cardWrapper}>
                                        <PlaceCard
                                            key={item.id}
                                            image={item.image}
                                            title={item.title}
                                            description={item.description}
                                        />
                                    </View>
                                ) : null
                            }
                            keyExtractor={(item) => item.id} // Assurez-vous que chaque élément a un id unique
                            showsHorizontalScrollIndicator={false} // Désactivation de la barre de défilement horizontale
                            snapToInterval={width} // Défilement d'une card à la fois
                            contentContainerStyle={{ justifyContent: "center" }} // Centrage des éléments du carrousel
                        />
                        <TouchableOpacity
                            onPress={goToNext}
                            style={styles.navigationButtonRight}
                        >
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.pagination}>
                        {cardsData.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.pageLine,
                                    currentIndex === index &&
                                        styles.activePageLine,
                                ]}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </>
    );
}

// Définition du style des différents éléments
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchScreenContainer: {
        flex: 1,
        marginTop: 200,
        paddingTop: 5,
        alignItems: "center",
    },
    carouselWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    cardWrapper: {
        width: width,
        justifyContent: "center",
        alignItems: "center",
    },

    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
    },
    pageLine: {
        width: 30,
        height: 4,
        backgroundColor: "#ccc",
        marginVertical: 1,
        marginHorizontal: 5,
        borderRadius: 2,
    },
    activePageLine: {
        backgroundColor: "#001F3F",
    },
    navigationButtonLeft: {
        position: "absolute",
        left: 2,
        zIndex: 1,
        padding: 1,
        borderRadius: 20,
    },
    navigationButtonRight: {
        position: "absolute",
        right: 2,
        zIndex: 1,
        padding: 1,
        borderRadius: 20,
    },
});
