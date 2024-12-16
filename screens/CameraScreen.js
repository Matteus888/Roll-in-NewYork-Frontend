import { StyleSheet, View, TouchableOpacity, Platform, Alert } from "react-native";
import { useState, useEffect, useRef } from "react";
import { CameraView, Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; // Import pour les icons
import { faXmark, faO, faRotate, faBolt } from "@fortawesome/free-solid-svg-icons"; // Import pour les icons
import { useDispatch, useSelector } from "react-redux";
import { addPicture } from "../reducers/pictures";
import { useNavigation } from "@react-navigation/native";

export default function CameraScreen({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.value);
  const isFocused = useIsFocused();
  const cameraRef = useRef(null);
  const selectedPlace = route.params?.selectedPlace;

  const [hasPermission, setHasPermission] = useState(false);
  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  // Demande de permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      if (status !== "granted") {
        Alert.alert("Permission denied", "Access to camera is required to take photos");
      }
    })();

    setFacing("back");
    setFlash(false);
  }, []);

  // Conditions to prevent more than 1 camera component to run in the bg
  if (!hasPermission || !isFocused) {
    return <View />;
  }

  const takePicture = async () => {
    if (isCapturing || !cameraRef.current) return;

    try {
      setIsCapturing(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: Platform.OS === "android" ? 0.5 : 0.3,
        exif: false,
        skipProcessing: Platform.OS === "android",
      });

      navigation.reset({
        index: 0,
        routes: [{ name: "Memories", params: { selectedPlace } }],
      });
      // Si la photo est valide
      if (photo?.uri) {
        const formData = new FormData();

        // Effacer les anciennes valeurs de userToken et idPlace
        formData.delete("userToken");
        formData.delete("idPlace");

        // Ajouter la photo au FormData
        formData.append("photoFromFront", {
          uri: photo.uri,
          name: photo.uri.split("/").pop(),
          type: "image/jpeg",
        });

        formData.append("userToken", user.token);
        formData.append("idPlace", route.params.selectedPlace.id);

        // Envoi de la requête avec le formData
        const response = await fetch("https://roll-in-new-york-backend.vercel.app/favorites/pictures", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        dispatch(addPicture(data.url)); // Mise à jour du store avec l'URL de la photo
      }
    } catch (err) {
      console.error("Error taking photo ", err);
      Alert.alert("An error occurred while taking photo.");
    } finally {
      setIsCapturing(false);
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    setFlash((current) => (current === false ? true : false));
  };

  const handleClose = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Memories", params: { selectedPlace } }],
    });
  };

  return (
    <>
      <CameraView
        style={styles.camera}
        facing={facing}
        enableTorch={flash}
        ref={(ref) => {
          cameraRef.current = ref;
        }}
        photo={true}
      >
        <View style={styles.cameraContainer}>
          <View style={styles.cameraHeader}>
            <View style={styles.cameraHeaderLeft}>
              <TouchableOpacity onPress={() => toggleCameraFacing()}>
                <FontAwesomeIcon icon={faRotate} size={40} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleFlash()}>
                <FontAwesomeIcon icon={faBolt} size={40} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => handleClose()}>
                <FontAwesomeIcon icon={faXmark} size={40} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cameraFooter}>
            <TouchableOpacity onPress={() => takePicture()}>
              <FontAwesomeIcon icon={faO} size={100} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </>
  );
}

// Définition du style des différents éléments
const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cameraHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: 30,
  },
  cameraHeaderLeft: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
