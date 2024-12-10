// Réalisation des différentes imports
import { useState } from "react"; // Import pour react
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, Image } from "react-native"; // Import pour react-native
import SignIn from "../components/SignIn"; // Import du composant SignIn.js
import SignUp from "../components/SignUp"; // Import du composant SignUp.js
import Header from "../components/Header"; // Import du composant Header.js

// Import des icons depuis cloudinary
const GoogleIcon = "https://res.cloudinary.com/dtkac5fah/image/upload/v1733818367/appIcons/rg2ynswpargugmvkxxlr.png";
const AppleIcon = "https://res.cloudinary.com/dtkac5fah/image/upload/v1733818367/appIcons/xir2gohgenartsleibcl.png";
const InstagramIcon = "https://res.cloudinary.com/dtkac5fah/image/upload/v1733818367/appIcons/ydznsdlqiyfpxdktbyqo.png";

// Création de la page Login
export default function LoginScreen() {
  const [isSignIn, setIsSignIn] = useState(false); // État pour afficher ou non le composant SignIn
  const [isSignUp, setIsSignUp] = useState(false); // État pour afficher ou non le composant SignUp

  return (
    <>
      <View style={styles.container}> {/* View contenant les éléments de la page */}
        <Header title="My connexion" showInput={false} /> {/* Affichage du composant Header */}
        <View style={styles.loginContainer}> {/* View contenant les différents éléments de la page */}
          <View style={styles.signContainer}> {/* View contenant les boutons Sign-In et Sign-Up */}
            <TouchableOpacity onPress={() => setIsSignIn(true)} style={styles.button} activeOpacity={0.8}> {/* Bouton Sign-In */}
              <Text style={styles.textButton}>SIGN-IN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsSignUp(true)} style={styles.button} activeOpacity={0.8}> {/* Bouton Sign-Up */}
              <Text style={styles.textButton}>SIGN-UP</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separateContainer}> {/* View contenant la séparation entre les boutons Sign-In et Sign-Up */}
            <View style={styles.separateBar}></View>
            <Text style={styles.separateText}>OU</Text>
            <View style={styles.separateBar}></View>
          </View>
          <View style={styles.methodConnexionContainer}> {/* View contenant les boutons de connexion avec Google, Apple et Instagram */}
            {[
              { icon: GoogleIcon, text: "Sign with Google" },
              { icon: AppleIcon, text: "Sign with Apple" },
              { icon: InstagramIcon, text: "Sign with Instagram" },
            ].map(({ icon, text }, index) => ( // Boucle pour afficher les différents boutons en fonction de l'icon et du texte
              <TouchableOpacity
                key={index}
                onPress={() => handleSubmit()} // Fonction à appeler lors du clic sur le bouton (Google, Apple ou Instagram)
                style={styles.methodConnexionButton}
                activeOpacity={0.8}
              >
                <Image style={styles.icon} source={{ uri: icon }} />
                <Text style={styles.methodConnexionTextButton}>{text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <SignIn isOpen={isSignIn} onClose={() => setIsSignIn(false)} /> {/* Affichage du composant SignIn si on clique sur le bouton SignIn */}
      <SignUp isOpen={isSignUp} onClose={() => setIsSignUp(false)} /> {/* Affichage du composant SignUp si on clique sur le bouton SignUp */}
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
