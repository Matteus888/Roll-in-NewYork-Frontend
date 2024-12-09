import { TextInput, StyleSheet } from "react-native";

export default function SearchInput() {
  return (
    <TextInput placeholder="Search for a movie..." placeholderTextColor="#DEB973" style={styles.input}></TextInput>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "80%",
    backgroundColor: "white",
    borderColor: "#DEB973",
    borderWidth: 2,
    borderRadius: 20,
    paddingLeft: 15,
    textAlign: "left",
  },
});
