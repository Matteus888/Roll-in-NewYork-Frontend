import { View, TouchableWithoutFeedback, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Picture({ selectedImage, isOpen, onClose, onDelete }) {
  // Vérifier si selectedImage et selectedImage.masonryDimensions existent
  if (!selectedImage || !selectedImage.masonryDimensions) {
    return null; // Si les données sont manquantes, ne rien afficher
  }
  // Récupérer la largeur et la hauteur de l'image sélectionnée
  const image = selectedImage.masonryDimensions;

  // Appliquer une rotation de 90 degrés si l'image est plus large que haute
  const rotationStyle = image.width > image.height ? { transform: [{ rotate: "90deg" }] } : {};

  // Si la modale n'est pas ouverte, on ne retourne rien
  if (!isOpen) {
    return null;
  }

  const handleDelete = () => {
    try {
      fetch(`https://roll-in-new-york-backend.vercel.app/favorites/pictures`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: selectedImage.publicId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            onClose();
            onDelete();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error("Error deleting picture:", err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modal}>
        <TouchableOpacity onPress={() => handleDelete()} style={styles.deleteButton} activeOpacity={0.8}>
          <FontAwesomeIcon icon={faTrash} size={30} color="red" />
        </TouchableOpacity>
        <Image source={{ uri: selectedImage.source.uri }} style={[styles.image, rotationStyle]} />
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
    justifyContent: "flex-end",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#001F3F",
    padding: 10,
    borderRadius: 50,
  },
  image: {
    width: 665,
    height: 670,
    resizeMode: "contain",
  },
});
