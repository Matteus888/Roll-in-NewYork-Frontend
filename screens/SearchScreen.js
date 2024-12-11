// Réalisation des différents imports
import {
    StyleSheet,
    View,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Text,
} from "react-native"; // Import pour react / react-native
import { useState, useEffect } from "react"; // Import pour react
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; // Import pour les icons
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons"; // Import pour les icons
import Header from "../components/Header"; // Import du composant Header
import PlaceCard from "../components/PlaceCard"; // Import du composant PlaceCard
import MovieCard from "../components/MovieCard"; // Import du composant MovieCard

const { width } = Dimensions.get("window"); // Récupération de la largeur de l'écran du téléphone

export default function SearchScreen({ route, navigation }) {


    const [currentIndex, setCurrentIndex] = useState(0); // État pour stocker l'index de la card lieux actuelle
    const [allPlaces, setAllPlaces] = useState([])  // Etat pour stocker tout les lieux

    
    
    // useEffect pour fetch tout les lieux 
        useEffect(()=>{
            fetch("https://roll-in-new-york-backend.vercel.app/places")
            .then((response) => response.json())
            .then((data) => {
                setAllPlaces(data.places)
            })
        },[])

    
    let movieCard
    let moviePlaces
    if (route.params===undefined){
        movieCard = <Text style={styles.searchMovie} >Search a movie!</Text>
    }else{
        // récupération des info du film cliqué en page d'accueil
        const {selectedMovie} = route.params
        movieCard =  <MovieCard 
        title={selectedMovie.title} 
        poster={selectedMovie.poster_path} 
        overview={selectedMovie.overview} 
        date={selectedMovie.release_date}
        ></MovieCard>

        // récupération des lieux du film
        moviePlaces= allPlaces.filter(place => place.moviesList.includes(selectedMovie.id));
        
    }
    

    // Fonction pour passer à la card du lieu suivant
    const goToNext = () => {
        const nextIndex = (currentIndex + 1) % moviePlaces.length;
        setCurrentIndex(nextIndex);
    };

    // Fonction pour passer à la card du lieu précédent
    const goToPrevious = () => {
        const prevIndex =
            (currentIndex - 1 + moviePlaces.length) % moviePlaces.length;
        setCurrentIndex(prevIndex);
    };

    return (
        <>
            <View style={styles.container}>
                <Header title="Roll-In NewYork" showInput={true} navigation={navigation}/>
                <View style={styles.searchScreenContainer}>
                    {movieCard}
                    {moviePlaces && moviePlaces.length>0 ? (
                        <>
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
                            data={moviePlaces}
                            horizontal // Indication de l'affichage horizontal
                            renderItem={(
                                { item, index } // Affichage des éléments du carrousel
                            ) =>
                                index === currentIndex ? ( // Si l'index de l'élément est égal à l'index actuel alors on affiche la card
                                    <View style={styles.cardWrapper}>
                                        <PlaceCard
                                            key={item._id}
                                            image={item.placePicture}
                                            title={item.title}
                                            description={item.overview}
                                            navigation={navigation}
                                        />
                                    </View>
                                ) : null
                            }
                            keyExtractor={(item) => item._id} // Assurez-vous que chaque élément a un id unique
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
                        {moviePlaces.map((_, index) => (
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
                    </>
                    ): (<></>)}
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
    searchMovie: {

    },
});
