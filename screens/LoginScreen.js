// Import pour react / react-native
import { useState } from "react";
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";

// Import des composants SignIn et SignUp
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Header from "../components/Header";

// Import des icons depuis cloudinary
const GoogleIcon = "https://res.cloudinary.com/dtkac5fah/image/upload/v1733818367/appIcons/rg2ynswpargugmvkxxlr.png";
const AppleIcon = "https://res.cloudinary.com/dtkac5fah/image/upload/v1733818367/appIcons/xir2gohgenartsleibcl.png";
const InstagramIcon = "https://res.cloudinary.com/dtkac5fah/image/upload/v1733818367/appIcons/ydznsdlqiyfpxdktbyqo.png";

// Création de la page Login
export default function LoginScreen() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <Header title="Ma connexion" showInput={false} />
        <View style={styles.loginContainer}>
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
            {[
              { icon: GoogleIcon, text: "Sign with Google" },
              { icon: AppleIcon, text: "Sign with Apple" },
              { icon: InstagramIcon, text: "Sign with Instagram" },
            ].map(({ icon, text }, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSubmit()}
                style={styles.methodConnexionButton}
                activeOpacity={0.8}
              >
                <Image style={styles.icon} source={{uri: icon}} />
                <Text style={styles.methodConnexionTextButton}>{text}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "#EFEFEF",
  },
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    marginTop: "15%",
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
