// Import pour react / react-native
import { View, StyleSheet } from "react-native";

// Import des composants
import Header from "../components/Header";

// Création de la page Favoris
export default function FavouriteScreen() {
  return (
    <View style={styles.container}>
      <Header title="Mes Favoris" showInput={false} />
      <View style={styles.favouritesScreenContainer}></View>
    </View>
  );
}

// Définition du style des différents éléments
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  favouritesScreenContainer: {
    flex: 1,
    marginTop: 200,
    paddingTop: 5,
    alignItems: "center",
  },
});
