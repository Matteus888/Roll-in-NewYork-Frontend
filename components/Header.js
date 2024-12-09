import { View, Image, StyleSheet, Dimensions, Text, ImageBackground } from "react-native";
import SearchInput from "./SearchInput";

const { width } = Dimensions.get("window");

export default function Header() {
  return (
    <ImageBackground style={styles.background} source={require("../assets/header-ny.jpg")}>
      <View style={styles.titleContainer}>
        <Image source={require("../assets/logo-ny.png")} style={styles.logo}></Image>
        <Text style={styles.title}>Roll-In NewYork</Text>
      </View>
      <View style={styles.input}>
        <SearchInput />
      </View>
    </ImageBackground>
  );
}

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
    paddingTop: 24,
    paddingRight: 46,
  },
  logo: {
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 28,
    color: "#282C37",
  },
  input: {},
});
