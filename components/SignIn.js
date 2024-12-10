import { useState } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacity, TextInput, Image } from "react-native";
import { useDispatch } from "react-redux";
import { updateUser } from "../reducers/users";
import { Toast } from "toastify-react-native";
const tower = "https://res.cloudinary.com/dtkac5fah/image/upload/v1733818367/appIcons/eh4j1tvmizqd9dwftj25.png";

export default function SignIn({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false, "");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async () => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email === "" || password === "") {
      setError(true);
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    } else if (!regex.test(email)) {
      setError(true);
      setErrorMessage("L'addresse email n'est pas valide");
      return;
    } else {
      setError(false);
      setErrorMessage("");
    }

    try {
      let response = await fetch(
        "https://roll-in-new-york-backend.vercel.app/users/signin/classic",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        let data = await response.json();
        if (data.result === true) {
          Toast.success("Connexion réussie", "top", { duration: 2000 });
          dispatch(updateUser(data.username));
          onClose();
        } else {
          Toast.error("Échec de la connexion", "top", { duration: 2000 });
        }
      } else {
        throw new Error("Erreur HTTP : " + response.status);
      }
    } catch (err) {
      console.error("❌ Database SignIn Error:", err);
      Toast.error("Une erreur est survenue", { duration: 2000 });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modal}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <Image source={{uri: tower}} height={70} width={40} style={styles.logo} />
                <Text style={styles.title}>Connexion</Text>
              </View>
              {error && <Text style={styles.error}>{errorMessage}</Text>}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Email"
                  onChangeText={(value) => setEmail(value)}
                  value={email}
                />
                <TextInput
                  style={styles.inputText}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={(value) => setPassword(value)}
                  value={password}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
              <Text style={styles.textButton}>SIGN-IN</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#001F3F",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  container: {
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    resizeMode: "contain",
    marginRight: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
  },
  inputText: {
    height: 50,
    borderWidth: 2,
    borderColor: "#001F3F",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    height: 50,
    width: "80%",
    backgroundColor: "#001F3F",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#DEB973",
    fontWeight: "bold",
  },
  error: {
    marginTop: 10,
    color: "red",
  },
});
