import { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList } from "react-native";
import { useFonts } from "expo-font";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function SearchInput() {
  const [filteredTweet, setFilteredTweet] = useState([]); // État pour stocker les résultats
  const [showPopup, setShowPopup] = useState(false); // État pour contrôler l'affichage de la pop-up
  const place = useSelector((state) => state.place.value);

  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  const searchMovies = (searchValue) => {
    const hashtagPattern = new RegExp(`${searchValue}`, "i");
    const results = place.filter((movie) => movie.title.match(hashtagPattern));
    setFilteredTweet(results);
    setShowPopup(searchValue.length > 0 && results.length > 0); // Afficher la pop-up seulement s'il y a des résultats
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search for a movie..."
          placeholderTextColor="#DEB973"
          style={styles.input}
          onChangeText={(value) => searchMovies(value)}
        />
        <TouchableOpacity>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size={20}
            color="#DEB973"
            style={styles.iconeSearch}
          />
        </TouchableOpacity>
      </View>
      {showPopup && (
        <View style={styles.popup}>
          <FlatList
            data={filteredTweet}
            keyExtractor={(item) => item.id.toString()} // Assurez-vous que chaque élément a un id unique
            renderItem={({ item }) => <Text style={styles.popupItem}>{item.title}</Text>}
            onPress={() => setShowPopup(false)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#DEB973",
    borderWidth: 2,
    borderRadius: 20,
    width: "100%",
    marginTop: 10,
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    color: "#282C37",
    paddingLeft: 10,
    paddingRight: 10,
  },
  iconeSearch: {
    marginRight: 10,
  },
  popup: {
    position: "absolute",
    top: 50,
    backgroundColor: "white",
    borderColor: "#DEB973",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: "100%",
    maxHeight: 150,
    zIndex: 1000,
  },
  popupItem: {
    fontSize: 14,
    color: "#282C37",
    paddingVertical: 5,
  },
});
