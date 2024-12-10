// Import pour react / react-native
import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from "react-native";
import { useFonts } from "expo-font";

import SearchInput from "./SearchInput";

// Récupération de la largeur de l'écran du téléphone
const { width } = Dimensions.get("window");

// Création du composant Header
export default function Header({ title, showInput }) {
  // Chargement des fonts personnalisés
  const [fontsLoaded] = useFonts({
    "JosefinSans-SemiBold": require("../assets/fonts/JosefinSans-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Affiche un écran blanc ou un indicateur de chargement
  }

  return (
    <ImageBackground style={styles.background} source={{uri: 'https://res.cloudinary.com/dtkac5fah/image/upload/v1733818358/appIcons/vq0xpnmecpqy9a8myr93.jpg'}}>
      <View style={styles.titleContainer}>
        <Image style={styles.logo} height={50} width={40} source={{uri: 'https://res.cloudinary.com/dtkac5fah/image/upload/v1733818367/appIcons/eh4j1tvmizqd9dwftj25.png'}} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {showInput && (
        <View style={styles.input}>
          <SearchInput />
        </View>
      )}
    </ImageBackground>
  );
}

// Définition du style des différents éléments
const styles = StyleSheet.create({
  background: {
    width: width,
    height: 200,
    position: "absolute",
    resizeMode: "cover",
    overflow: "hidden",
  },
  titleContainer: {
    flexDirection: "row",
    width: width,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingTop: 30,
    paddingRight: 40,
  },
  logo: {
    resizeMode: "contain",
  },
  title: {
    fontFamily: "JosefinSans-SemiBold",
    fontSize: 36,
    color: "#282C37",
  },
  input: {
    alignItems: "center",
    marginTop: 50,
  },
});
