// Réalisation des différents imports
import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from "react-native"; // Import pour react / react-native
import { useFonts } from "expo-font"; // Import pour expo
import SearchInput from "./SearchInput"; // Import du composant SearchInput.js

// Import du logo + background depuis cloudinary
const background = "https://res.cloudinary.com/dtkac5fah/image/upload/v1733818358/appIcons/vq0xpnmecpqy9a8myr93.jpg"
const tower = "https://res.cloudinary.com/dtkac5fah/image/upload/v1733818367/appIcons/eh4j1tvmizqd9dwftj25.png"

export default function Header({ title, showInput }) {
  const [fontsLoaded] = useFonts({ // Chargement des fonts personnalisés
    "JosefinSans-SemiBold": require("../assets/fonts/JosefinSans-SemiBold.ttf"),
  });

  if (!fontsLoaded) { // Si les fonts ne sont pas chargées, on retourne null
    return null;
  }

  return (
    <ImageBackground style={styles.background} source={{uri: background}}> {/* Image de fond */}
      <View style={styles.titleContainer}> {/* View contenant le titre */}
        <Image style={styles.logo} height={50} width={40} source={{uri: tower}} /> {/* Image du logo */}
        <Text style={styles.title}>{title}</Text>
      </View>
      {showInput && ( // Si showInput est vrai alors on affiche le composant SearchInput
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
    width: Dimensions.get("window").width,
    height: 200,
    position: "absolute",
    resizeMode: "cover",
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
