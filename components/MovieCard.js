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
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/original${props.poster}` }} style={styles.image} />
      </View>
      {/* View pour un séparateur en forme de barre vertical */}
      <View style={styles.verticalBar}></View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.title.length > 20? props.title.substring(0, 20) + "..." : props.title}</Text>
        <Text style={styles.date}>Date de sortie: {props.date} </Text>
        <Text style={styles.description} numberOfLines={3}>
          {props.overview}
        </Text>
      </View>
    </View>
  );
}

// Définition du style des différents éléments
const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width - 50,
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
    marginBottom: 10
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
