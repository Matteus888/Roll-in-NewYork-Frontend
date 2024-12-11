// Réalisation des différents imports
import { StyleSheet, TouchableOpacity, Dimensions, View, Text, Image } from "react-native"; // Import pour react / react-native
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; // Import pour les icons
import { faHeart, faCamera, faStar } from "@fortawesome/free-solid-svg-icons"; // Import pour les icons
import { useFonts } from "expo-font"; // Import pour expo
import ReviewsScreen from "../screens/ReviewsScreen";

// Création de la card représentant les lieux de tournage référencés
export default function PlaceCard({ image, title, description, noteAverage, navigation }) {
  const [fontsLoaded] = useFonts({
    // Chargement des fonts personnalisés
    "JosefinSans-Bold": require("../assets/fonts/JosefinSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    // Si les fonts ne sont pas chargées, on retourne null
    return null;
  }

  // Average evaluation
  const stars = [];
  for (let i = 0; i < 5; i++) {
    let style = {};
    if (i < noteAverage) {
      style = { color: "yellow" };
    }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} size={10} />);
  }

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.verticalBar}></View>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title.length > 10 ? title.substring(0, 10) + "..." : title}</Text>
          <View style={styles.iconBox}>
            <TouchableOpacity style={styles.iconTouchBox} onPress={() => { navigation.navigate('Reviews') }}>
              <FontAwesomeIcon icon={faHeart} size={10} color="#D71111" />
              <FontAwesomeIcon icon={faCamera} size={10} color="#2e90da" />
              <View style={styles.stars}>
                {stars}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.description} numberOfLines={4}>
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
  stars: {
    flexDirection: "row",
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
