// Import pour react / react-native
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import { useFonts } from "expo-font";

// Récupération de la largeur de l'écran du téléphone
const { width } = Dimensions.get("window");

// Création de la card (en version simplifié) représentant les lieux de tournage référencés
export default function PlaceMiniCard({ markerPressed }) {
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
        {/* <Image source={{ uri: markerPressed.placePicture }} style={styles.image} /> */}
      </View>
      {/* View pour un séparateur en forme de barre vertical */}
      <View style={styles.verticalBar}></View>

      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{markerPressed.title}</Text>
        </View>
        <Text style={styles.address} numberOfLines={2}>
          {markerPressed.address}
        </Text>
      </View>
    </View>
  );
}

// Définition du style des différents éléments
const styles = StyleSheet.create({
  card: {
    width: width - 120,
    height: 80,
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
    width: "35%",
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
    height: "80%",
    alignSelf: "center",
    marginHorizontal: 5,
  },
  textContainer: {
    width: "50%",
    height: "100%",
    marginHorizontal: 1,
    paddingVertical: 15,
    justifyContent: "flex-start",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: "JosefinSans-Bold",
    fontWeight: "bold",
    color: "black",
  },
  address: {
    maxWidth: "100%",
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
    color: "black",
    textAlign: "left",
    marginTop: 2,
  },
});
