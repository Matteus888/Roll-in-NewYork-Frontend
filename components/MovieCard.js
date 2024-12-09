// Import pour react / react-native
import { StyleSheet, TouchableOpacity, Dimensions, View, Text, Image } from "react-native";

// Récupération de la largeur de l'écran du téléphone
const { width } = Dimensions.get("window");

// Création du composant représentant une fiche film
export default function MovieCard() {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: "https://via.placeholder.com/100x150.png" }} style={styles.image} />
      </View>
      {/* View pour un séparateur en forme de barre vertical */}
      <View style={styles.verticalBar}></View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Film</Text>
        <Text style={styles.date}>Année de sortie: </Text>
        <Text style={styles.description} numberOfLines={4}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius quam ex animi temporibus nobis blanditiis,
          deleniti dolor autem iure tenetur sequi corrupti aut quas, voluptates at, repudiandae deserunt rem aliquam!
        </Text>
      </View>
    </View>
  );
}

// Définition du style des différents éléments
const styles = StyleSheet.create({
  card: {
    width: width - 30,
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
    fontWeight: "bold",
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
