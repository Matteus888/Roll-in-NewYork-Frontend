import { StyleSheet, View, TouchableOpacity} from "react-native";
import { useState, useEffect, useRef } from "react";
import { CameraView, Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; // Import pour les icons
import { faXmark, faO, faRotate, faBolt } from "@fortawesome/free-solid-svg-icons"; // Import pour les icons
import { useDispatch, useSelector } from "react-redux";
import { addPicture } from "../reducers/pictures";
import { useNavigation } from "@react-navigation/native";
const formData = new FormData();

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

  // Effect hook to check permission upon each mount
  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result && result?.status === "granted");
    })();

    setFacing("back");
    setFlash(false);

    return () => {
      if (cameraRef.current) {
        console.log("Cleaning up camera");
        cameraRef.current = null;
      }
    };
  
  }, []);

  // Conditions to prevent more than 1 camera component to run in the bg
  if (!hasPermission || !isFocused) {
    return <View />;
  }
  
  const takePicture = async () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Memories', params: { selectedPlace } }],
    });
    
    const photo = await cameraRef.current?.takePictureAsync({quality: 0.8});    
    try {
      // Effacer les anciennes valeurs de userToken et idPlace
      formData.delete("userToken");
      formData.delete("idPlace");

      // Ajouter la photo
      formData.append("photoFromFront", {
        uri: photo.uri,
        name: photo.uri.substring(
          photo.uri.lastIndexOf("/") + 1,
          photo.uri.lastIndexOf(".jpg")
        ),
        type: "image/jpeg",
      });

      // Ajouter userToken si nécessaire
      if (!formData.has("userToken")) {
        formData.append("userToken", user.token);
      }

      // Ajouter idPlace si nécessaire
      if (!formData.has("idPlace")) {
        formData.append("idPlace", route.params.selectedPlace.id);
      }

      // Envoi de la requête avec le formData
      fetch("https://roll-in-new-york-backend.vercel.app/favorites/pictures", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          photo && dispatch(addPicture(data.url))
        })
        .catch((err) => console.log("Impossible de contacter le back", err));
    } catch (err) {
      console.error("Erreur lors de l'ajout de la photo :", err);
    }
  };

  // Functions to toggle camera facing and flash status
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    setFlash((current) => (current === false ? true : false));
  };
  
  const handleClose = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Memories', params: { selectedPlace } }],
    });
  };

  return (
    <>
      <CameraView
        style={styles.camera}
        facing={facing}
        enableTorch={flash}
        ref={(ref) => (cameraRef.current = ref)}
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
            <TouchableOpacity onPress={takePicture}>
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
