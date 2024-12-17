import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  ImageBackground,
} from "react-native";
import { useFonts } from "expo-font";
import { Asset } from "expo-asset"; // Import pour le préchargement d'assets
import SearchInput from "./SearchInput";

// Définir les URL Cloudinary des images
const backgroundUri =
  "https://res.cloudinary.com/dtkac5fah/image/upload/v1734427300/appIcons/qcfodpqgcxpddjjrzxvm.webp";
const towerUri =
  "https://res.cloudinary.com/dtkac5fah/image/upload/v1734427451/appIcons/umtepna0xmfeki5tffxw.webp";

export default function Header({ title, showInput, navigation }) {
  const [fontsLoaded] = useFonts({
    "JosefinSans-SemiBold": require("../assets/fonts/JosefinSans-SemiBold.ttf"),
  });

  const [imagesLoaded, setImagesLoaded] = useState(false); // État pour gérer le chargement des images

  useEffect(() => {
    // Précharger les images
    const loadAssets = async () => {
      await Asset.loadAsync([backgroundUri, towerUri]);
      setImagesLoaded(true);
    };

    loadAssets();
  }, []);

  if (!fontsLoaded || !imagesLoaded) {
    // Si les fonts ou les images ne sont pas encore chargées
    return null;
  }

  return (
    <ImageBackground
      style={styles.background}
      source={{ uri: backgroundUri }} // L'image a été préchargée
    >
      <View style={styles.titleContainer}>
        <Image
          style={styles.logo}
          height={50}
          width={40}
          source={{ uri: towerUri }} // L'image a été préchargée
        />
        <Text style={styles.title}>{title}</Text>
      </View>
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
