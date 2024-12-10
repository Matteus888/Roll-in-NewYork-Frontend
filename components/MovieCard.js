// Réalisation des différents imports
import { StyleSheet, Dimensions, View, Text, Image } from "react-native"; // Import pour react / react-native
import { useFonts } from "expo-font"; // Import pour expo

export default function MovieCard(movieData) {
  const [fontsLoaded] = useFonts({ // Chargement des fonts personnalisés
    "JosefinSans-Bold": require("../assets/fonts/JosefinSans-Bold.ttf"),
  });

  if (!fontsLoaded) { // Si les fonts ne sont pas chargées, on retourne null
    return null;
  }

  return (
    <View style={styles.card}> {/* View contenant les éléments de la card */}
      <View style={styles.imageContainer}> {/* View contenant l'image */}
        <Image source={{ uri: movieData.poster_path }} style={styles.image} />
      </View>
      <View style={styles.verticalBar}></View> {/* View pour un séparateur en forme de barre vertical */}
      <View style={styles.textContainer}> {/* View contenant le texte */}
        <Text style={styles.title}>{movieData.original_title}</Text> {/* Ajout du titre */}
        <Text style={styles.date}>Date de sortie: {movieData.release_date} </Text> {/* Ajout de la date de sortie */}
        <Text style={styles.description} numberOfLines={4}> {/* Ajout de la Description */}
          {movieData.overview}
        </Text>
      </View>
    </View>
  );
}

// Définition du style des différents éléments
const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width - 30,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: "#282C37",
    backgroundColor: "white",
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  imageContainer: {
    width: "25%",
    height: "90%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  verticalBar: {
    width: 2.5,
    backgroundColor: "#282C37",
    height: "65%",
    alignSelf: "center",
    marginHorizontal: 8,
  },
  textContainer: {
    width: "70%",
    height: "100%",
    marginHorizontal: 2,
    paddingVertical: 5,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontFamily: "JosefinSans-Bold",
    color: "black",
  },
  date: {
    fontSize: 10,
    opacity: 0.5,
  },
  description: {
    maxWidth: "100%",
    fontSize: 12,
    color: "black",
    textAlign: "left",
    marginTop: 2,
  },
});
