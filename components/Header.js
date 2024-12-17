import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from "react-native";
import { useFonts } from "expo-font";
import SearchInput from "./SearchInput";

// Import du logo + background depuis cloudinary
const background = "https://res.cloudinary.com/dtkac5fah/image/upload/v1733818358/appIcons/vq0xpnmecpqy9a8myr93.jpg";
const tower = "https://res.cloudinary.com/dtkac5fah/image/upload/v1733818367/appIcons/eh4j1tvmizqd9dwftj25.png";

export default function Header({ title, showInput, navigation }) {
  // Chargement font personnalisé
  const [fontsLoaded] = useFonts({
    "JosefinSans-SemiBold": require("../assets/fonts/JosefinSans-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground style={styles.background} source={{ uri: background }}>
      <View style={styles.titleContainer}>
        <Image style={styles.logo} height={50} width={40} source={{ uri: tower }} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {/* La barre de recherche ne s'affiche pas sur toutes les pages */}
      {showInput && (
        <View style={styles.input}>
          <SearchInput navigation={navigation} />
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: Dimensions.get("window").width,
    height: 200,
    position: "absolute",
    resizeMode: "cover",
  },
  titleContainer: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
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
