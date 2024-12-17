import { useState } from "react";
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, Image,} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/users";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Header from "../components/Header";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [isSignIn, setIsSignIn] = useState(false); // État pour afficher ou non le composant SignIn
  const [isSignUp, setIsSignUp] = useState(false); // État pour afficher ou non le composant SignUp

  return (
    <>
      <View style={styles.container}>
        <Header title="My connexion" showInput={false} />
        <View style={styles.loginContainer}>
          {user.token !== null ? (
            <Text style={styles.welcomeTxt}>Welcome {user.username}</Text>
          ) : null}
          {user.token === null ? (
            <>
              <View style={styles.signContainer}>
                <TouchableOpacity onPress={() => setIsSignIn(true)} style={styles.button} activeOpacity={0.8}>
                  <Text style={styles.textButton}>SIGN-IN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsSignUp(true)} style={styles.button} activeOpacity={0.8}>
                  <Text style={styles.textButton}>SIGN-UP</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.signContainer}>
              <TouchableOpacity onPress={() => dispatch(logout())} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          )}
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
  welcomeTxt: {
    fontSize: 34,
    marginBottom: 40,
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
  }
});
