// Réalisation des différents imports
import { StyleSheet, TouchableOpacity, Dimensions, View, Text, Image } from "react-native"; // Import pour react / react-native
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; // Import pour les icons
import { faHeart, faCamera, faStar } from "@fortawesome/free-solid-svg-icons"; // Import pour les icons
import { useFonts } from "expo-font"; // Import pour expo

// Création de la card représentant les lieux de tournage référencés
export default function PlaceCard({ image, title, description }) {
  const [fontsLoaded] = useFonts({ // Chargement des fonts personnalisés
    "JosefinSans-Bold": require("../assets/fonts/JosefinSans-Bold.ttf"),
  });

  if (!fontsLoaded) { // Si les fonts ne sont pas chargées, on retourne null
    return null;
  }

  return (
    <View style={styles.card}> {/* View contenant les éléments de la card */}
      <View style={styles.imageContainer}> {/* View contenant l'image */}
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.verticalBar}></View> {/* View pour un séparateur en forme de barre vertical */}
      <View style={styles.textContainer}> {/* View contenant le texte */}
        <View style={styles.titleContainer}> {/* View contenant le titre et les icons */}
          <Text style={styles.title}>{title}</Text> {/* Ajout du titre */}
          <View style={styles.iconBox}> {/* View contenant les icons */}
            <TouchableOpacity style={styles.iconTouchBox}> {/* Bouton pour les icons */}
              <FontAwesomeIcon icon={faHeart} size={12} color="#D71111" />
              <FontAwesomeIcon icon={faCamera} size={12} color="#2e90da" />
            </TouchableOpacity>
            <FontAwesomeIcon icon={faStar} size={12} color="yellow" /> {/* Icon étoile */}
            <FontAwesomeIcon icon={faStar} size={12} color="yellow" /> {/* Icon étoile */}
            <FontAwesomeIcon icon={faStar} size={12} color="yellow" /> {/* Icon étoile */}
            <FontAwesomeIcon icon={faStar} size={12} color="yellow" /> {/* Icon étoile */}
            <FontAwesomeIcon icon={faStar} size={12} color="yellow" /> {/* Icon étoile */}
          </View>
        </View>
        <Text style={styles.description} numberOfLines={5}> {/* Ajout de la description */}
          {description}
        </Text>
      </View>
    </View>
  );
}

// Définition du style des différents éléments
const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width - 80,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: "#282C37",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  imageContainer: {
    width: "30%",
    height: "100%",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  verticalBar: {
    width: 1,
    backgroundColor: "#282C37",
    height: "75%",
    alignSelf: "center",
    marginHorizontal: 5,
  },
  textContainer: {
    width: "65%",
    height: "100%",
    marginHorizontal: 2,
    paddingVertical: 5,
    justifyContent: "flex-start",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 1,
  },
  iconBox: {
    flexDirection: "row",
  },
  iconTouchBox: {
    flexDirection: "row",
    marginHorizontal: 10,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: "JosefinSans-Bold",
    color: "black",
  },
  description: {
    maxWidth: "100%",
    fontSize: 12,
    color: "black",
    textAlign: "left",
    marginTop: 2,
  },
});
