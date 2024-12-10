// Import pour react / react-native
import { StyleSheet, TouchableOpacity, Dimensions, View, Text, Image } from "react-native";

// Import pour expo
import { useFonts } from "expo-font";

// Import des icones FontAweSome
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart, faCamera, faStar } from "@fortawesome/free-solid-svg-icons";

// Récupération de la largeur de l'écran du téléphone
const { width } = Dimensions.get("window");

// Création de la card représentant les lieux de tournage référencés
export default function PlaceCard({ image, title, description }) {
  // Chargement des fonts personnalisés
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "JosefinSans-Bold": require("../assets/fonts/JosefinSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      {/* View pour un séparateur en forme de barre vertical */}
      <View style={styles.verticalBar}></View>

      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.iconBox}>
            <TouchableOpacity style={styles.iconTouchBox}>
              <FontAwesomeIcon icon={faHeart} size={12} color="#D71111" />
              <FontAwesomeIcon icon={faCamera} size={12} color="#2e90da" />
            </TouchableOpacity>
            <FontAwesomeIcon icon={faStar} size={12} color="yellow" />
            <FontAwesomeIcon icon={faStar} size={12} color="yellow" />
            <FontAwesomeIcon icon={faStar} size={12} color="yellow" />
            <FontAwesomeIcon icon={faStar} size={12} color="yellow" />
            <FontAwesomeIcon icon={faStar} size={12} color="yellow" />
          </View>
        </View>
        <Text style={styles.description} numberOfLines={5}>
          {description}
        </Text>
      </View>
    </View>
  );
}

// Définition du style des différents éléments
const styles = StyleSheet.create({
  card: {
    width: width - 80,
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
    fontFamily: "Montserrat-Regular",
    color: "black",
    textAlign: "left",
    marginTop: 2,
  },
});
