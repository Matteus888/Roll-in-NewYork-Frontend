import { StyleSheet, Dimensions, View, TouchableOpacity, Text, SafeAreaView } from "react-native";
import PlaceCard from "../components/PlaceCard";
import Header from "../components/Header";
import { useState, useEffect, useRef } from "react";
import { CameraView, CameraType, FlashMode, Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; // Import pour les icons
import { faXmark, faRotate, faUpload } from "@fortawesome/free-solid-svg-icons"; // Import pour les icons
import { useSelector } from "react-redux";
const formData = new FormData();

export default function MemoriesCamera({idPlace, onClose}) {
    const user = useSelector((state) => state.user.value);
    const isFocused = useIsFocused();
    const cameraRef = useRef(null);

    const [hasPermission, setHasPermission] = useState(false);
    
    // Effect hook to check permission upon each mount
    useEffect(() => {
        (async () => {
            const result = await Camera.requestCameraPermissionsAsync();
            setHasPermission(result && result?.status === "granted");
        })();
    }, []);
    
    // Conditions to prevent more than 1 camera component to run in the bg
    if (!hasPermission || !isFocused) {
        return <View />;
    }

    const takePicture = async () => {
        const photo = await cameraRef.current?.takePictureAsync({ quality: 0.6 });

        try {
            formData.append('photoFromFront', {
                uri: photo.uri,
                name: photo.uri.substring(photo.uri.lastIndexOf('/') + 1, photo.uri.lastIndexOf('.jpg')),
                type: 'image/jpeg',
            });
            if (!formData.has('userToken')) {
                formData.append('userToken', user.token);
            }
            if (!formData.has('idPlace')) {
                formData.append('idPlace', idPlace);
            }
            fetch('https://roll-in-new-york-backend.vercel.app/favorites/pictures', {
                method: 'POST',
                body: formData,
            })
            .then(res => res.json())
            .then(data => photo &&  console.log(data))	//dispatch(addPhoto(data.url))
            .catch(err => console.log('Impossible de contacter le back', err));
        } catch(err) {
            console.log('❌ Une erreur est survenue lors de la sauvegarde de la photo', err);
        }
    };

    return (
        <>
            <CameraView style={styles.camera} ref={(ref) => (cameraRef.current = ref)}>
                <View style={styles.cameraContainer}>
                    <View>
                        <View>
                            <TouchableOpacity style={styles.snapButton} onPress={() => onClose()}>
                                <FontAwesomeIcon icon={faXmark} size={40} color="#DEB973" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.snapButton} onPress={() => onClose()}>
                                <FontAwesomeIcon icon={faXmark} size={40} color="#DEB973" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.snapButton} onPress={() => onClose()}>
                                <FontAwesomeIcon icon={faXmark} size={40} color="#DEB973" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.snapButton} onPress={takePicture}>
                            <Text>test</Text>
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
        justifyContent: "space-between",
    },
    settingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
    },
    settingButton: {
        width: 40,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    cameraContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    snapButton: {
        width: 100,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});