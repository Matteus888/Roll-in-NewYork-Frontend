// Import pour react / react-native
import { useState } from "react";
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";

// Import des composants SignIn et SignUp
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

// Import des icons dans les assets
import GoogleIcon from "../assets/icons/google.png";
import AppleIcon from "../assets/icons/apple.png";
import InstagramIcon from "../assets/icons/instagram.png";

// Création de la page Login
export default function LoginScreen() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.signContainer}>
          <TouchableOpacity onPress={() => setIsSignIn(true)} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>SIGN-IN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsSignUp(true)} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>SIGN-UP</Text>
          </TouchableOpacity>
        </View>
        {/* View qui contient le séparateur : --- OU ---- */}
        <View style={styles.separateContainer}>
          <View style={styles.separateBar}></View>
          <Text style={styles.separateText}>OU</Text>
          <View style={styles.separateBar}></View>
        </View>
        <View style={styles.methodConnexionContainer}>
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.methodConnexionButton} activeOpacity={0.8}>
            <Image style={styles.icon} source={GoogleIcon} />
            <Text style={styles.methodConnexionTextButton}>Sign with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.methodConnexionButton} activeOpacity={0.8}>
            <Image style={styles.icon} source={AppleIcon} />
            <Text style={styles.methodConnexionTextButton}>Sign with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.methodConnexionButton} activeOpacity={0.8}>
            <Image style={styles.icon} source={InstagramIcon} />
            <Text style={styles.methodConnexionTextButton}>Sign with Instagram</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SignIn isOpen={isSignIn} onClose={() => setIsSignIn(false)} />
      <SignUp isOpen={isSignUp} onClose={() => setIsSignUp(false)} />
    </>
  );
}

// Définition du style des différents éléments
const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "#EFEFEF",
  },
  signContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "20%",
    width: "100%",
    marginBottom: "5%",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    width: "70%",
    backgroundColor: "#001F3F",
    borderRadius: 50,
  },
  textButton: {
    color: "#DEB973",
    fontWeight: "bold",
  },
  separateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "50%",
  },
  separateBar: {
    height: "20%",
    width: "35%",
    backgroundColor: "#001F3F",
    borderRadius: 20,
  },
  separateText: {
    color: "#001F3F",
    fontWeight: "bold",
  },
  methodConnexionContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "30%",
    width: "100%",
  },
  methodConnexionButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%",
    width: "55%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 50,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    marginRight: 10,
  },
  methodConnexionTextButton: {
    alignItems: "center",
    marginRight: 45,
  },
});
