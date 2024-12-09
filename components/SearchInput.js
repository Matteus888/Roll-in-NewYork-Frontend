// Import pour react / react-native
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";

// Import des icones FontAweSome
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// Création du composant SearchInput
export default function SearchInput() {
  const handleSearch = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Search for a movie..." placeholderTextColor="#DEB973" style={styles.input} />
        <TouchableOpacity onPress={() => handleSearch()}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#DEB973" style={styles.iconeSearch} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Définition du style des différents éléments
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
    color: "#282C37",
    fontFamily: "Montserrat",
    paddingLeft: 10,
    paddingRight: 10,
  },
  iconeSearch: {
    marginRight: 10,
  },
});
