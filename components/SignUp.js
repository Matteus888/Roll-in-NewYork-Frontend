// Réalisation des différents imports
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native"; // Import pour react-native
import { useState } from "react"; // Import pour react
import { useDispatch } from "react-redux"; // Import pour redux
import { login } from "../reducers/users"; // Import de la fonction login depuis le reducer users
import { Toast } from "toastify-react-native"; // Import pour les notifications

// Import de l'icone depuis cloudinary
const tower =
  "https://res.cloudinary.com/dtkac5fah/image/upload/v1734427451/appIcons/umtepna0xmfeki5tffxw.webp";

export default function SignUp({ isOpen, onClose }) {
  // Création du composant SignUp
  const dispatch = useDispatch(); // Initialisation de la fonction dispatch pour envoyer les actions à redux
  const [username, setUsername] = useState(""); // Initialisation de l'état username pour stocker le nom de l'utilisateur
  const [email, setEmail] = useState(""); // Initialisation de l'état email pour stocker l'email de l'utilisateur
  const [password, setPassword] = useState(""); // Initialisation de l'état password pour stocker le mot de passe de l'utilisateur
  const [confirmPassword, setConfirmPassword] = useState(""); // Initialisation de l'état confirmPassword pour stocker la confirmation du mot de passe de l'utilisateur
  const [error, setError] = useState(false, ""); // Initialisation de l'état error pour gérer les erreurs
  const [errorMessage, setErrorMessage] = useState(""); // Initialisation de l'état errorMessage pour stocker le message d'erreur

  if (!isOpen) {
    // Condition pour dire que si la modale n'est pas ouverte, on ne retourne rien ce qui empeche l'ouverture automatique depuis la page LoginScreen.js
    return null;
  }

  const handleSubmit = async () => {
    // Fonction pour gérer l'envoi du formulaire
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour vérifier que l'email est valide
    if (username === "" || email === "" || password === "") {
      // Condition pour dire que si les champs sont vides
      setError(true); // On met l'erreur à true
      setErrorMessage("Please complete all fields"); // On affiche un message d'erreur
      return;
    } else if (!regex.test(email)) {
      // Condition pour dire que si l'email n'est pas valide
      setError(true); // On met l'erreur à true
      setErrorMessage("Invalid email address"); // On affiche un message d'erreur
      return;
    } else if (password !== confirmPassword) {
      // Condition pour dire que si les mots de passe ne correspondent pas
      setError(true); // On met l'erreur à true
      setErrorMessage("Passwords don't match"); // On affiche un message d'erreur
    } else {
      setError(false); // On met l'erreur à false
      setErrorMessage(""); // On vide le message d'erreur
    }

    try {
      let response = await fetch(
        "https://roll-in-new-york-backend.vercel.app/users/signup/classic",
        {
          // Requête pour créer un compte
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            email: email,
            password: confirmPassword,
          }), // Envoi des données du formulaire en JSON en tant que body
        }
      );

      if (response.ok) {
        // Condition pour dire que si la réponse de retour de l'objet response.ok est égal à "true"
        let data = await response.json(); // On stocke les données de la réponse dans la variable data
        if (data.result === true) {
          // Condition pour dire que si le résultat de la réponse est égal à "true"
          Toast.success("Account created !", "top", {
            duration: 2000,
          }); // On affiche une notification de succès
          dispatch(
            login({
              username: data.username,
              email: data.email,
              token: data.token,
              id: data.id
            })
          ); // On envoie les données de l'utilisateur dans le store
          onClose(); // On ferme la modale (Pop-up SignUp)
          setUsername(""); // On vide le champ username
          setEmail(""); // On vide le champ email
          setPassword(""); // On vide le champ password
          setConfirmPassword(""); // On vide le champ confirmPassword
        } else {
          Toast.error("Connexion failed !", "top", {
            duration: 2000,
          }); // On affiche une notification d'erreur
          return;
        }
      } else {
        console.log("❌ Database SignUp Error:", response.status); // On affiche un message d'erreur dans la console
        return;
      }
    } catch (err) {
      // Condition pour dire que si une erreur est survenue
      console.error("❌ Database SignUp Error:", err); // On affiche un message d'erreur dans la console
      Toast.error("Une erreur est survenue", { duration: 2000 }); // On affiche une notification d'erreur
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modal}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <Image
                  source={{ uri: tower }}
                  height={70}
                  width={40}
                  style={styles.logo}
                />
                <Text style={styles.title}>Connexion</Text>
              </View>
              {error && <Text style={styles.error}>{errorMessage}</Text>}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Name"
                  onChangeText={(value) => setUsername(value)}
                  value={username}
                />
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
                <TextInput
                  style={styles.inputText}
                  placeholder="Confirm password"
                  secureTextEntry={true}
                  onChangeText={(value) => setConfirmPassword(value)}
                  value={confirmPassword}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.textButton}>SIGN-UP</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Style des différents éléments
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
  containerKeyboardAvoidingView: {},
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
