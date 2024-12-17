import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import PlaceCard from "../components/PlaceCard";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; // Import pour les icons
import { faCamera, faUpload, faStar } from "@fortawesome/free-solid-svg-icons"; // Import pour les icons
import MasonryList from "react-native-masonry-list";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPicture } from "../reducers/pictures";
import { useFonts } from "expo-font";
import { Toast } from "toastify-react-native"; // Import pour les notifications
import Picture from "../components/Picture";
import * as ImagePicker from "expo-image-picker";

export default function MemoriesScreen({ route, navigation }) {
  const user = useSelector((state) => state.user.value);
  const { selectedPlace } = route.params;
  const dispatch = useDispatch();

  //mise en place des états pour poster un nouvel avis
  const [personalNote, setPersonalNote] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewPictures, setViewPictures] = useState(false);
  const [selectedImage, setSelectedImage] = useState(""); // État pour l'URL de l'image sélectionnée
  const [newReviewText, setNewReviewText] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshGallery, setRefreshGallery] = useState(0);

  const [fontsLoaded] = useFonts({
    // Chargement des fonts personnalisés
    "JosefinSans-Bold": require("../assets/fonts/JosefinSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://roll-in-new-york-backend.vercel.app/favorites/pictures/${user.token}/${selectedPlace.id}`
        );
        const data = await response.json();
        const newPictures = data.urls.map((secure_url) => ({
          uri: secure_url.secure_url,
          publicId: secure_url.public_id,
        }));
        setPictures(newPictures);
        setLoading(false); // Les images ont été chargées
      } catch (err) {
        console.error("Error fetching memories:", err);
        setLoading(false);
      }
    })();

    return () => {
      setPictures([]);
      setLoading(true);
    };
  }, [route.params.selectedPlace.id, user.token, refreshGallery]);

  const handleCamera = () => {
    const selectedPlace = {
      id: route.params.selectedPlace.id,
      title: route.params.selectedPlace.title,
      image: route.params.selectedPlace.image,
      description: route.params.selectedPlace.description,
    };
    navigation.navigate("Camera", { selectedPlace }); // Ne passez pas `navigation`
  };

  //mise en place des étoile pour noter le lieu
  const personalStars = [];
  for (let i = 0; i < 5; i++) {
    let style = { color: "#EFEFEF" };
    if (i < personalNote) {
      style = { color: "#DEB973" };
    }
    personalStars.push(
      <TouchableOpacity key={`starIndex: ${i}`} onPress={() => setPersonalNote(i + 1)}>
        <FontAwesomeIcon icon={faStar} style={style} size={30} />
      </TouchableOpacity>
    );
  }

  const handlePostReview = () => {
    const newReviewData = {
      user: user.id,
      place: selectedPlace.id,
      createdAt: new Date(),
      note: personalNote,
      content: newReviewText,
    };
    if (newReviewText === "") {
      console.log("Please write something");
      return;
    } else {
      fetch(`https://roll-in-new-york-backend.vercel.app/reviews/${user.token}/${selectedPlace.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReviewData),
      })
        .then((response) => response.json())
        .then((data) => {
          Toast.success("Review posted !", "top", {
            duration: 2000,
          });
          setNewReviewText("");
          setPersonalNote(0);
          setRefreshKey(refreshKey + 1);
        });
    }
    //mise à jour de la note moyenne et enregitrement dans le reducer
    console.log("note update");
  };



  const placeCard = (
    <PlaceCard
      key={refreshKey}
      id={selectedPlace.id}
      title={selectedPlace.title}
      image={selectedPlace.image}
      description={selectedPlace.description}
    ></PlaceCard>
  );

  const handleFilePick = async () => {
    try {
      // Demande autorisation d'accès à la galerie
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "We need your permission to access your gallery");
        return;
      }

      // Sélection d'une ou prlusieurs images de la mémoire du téléphone
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.5,
      });

      // Boucle d'envoie de chaque images séléctionnées
      if (!result.canceled && result.assets.length > 0) {
        let uploadSuccess = 0;

        for (const asset of result.assets) {
          try {
            const formData = new FormData();

            formData.append("photoFromFront", {
              uri: asset.uri,
              name: asset.uri.split("/").pop(),
              type: "image/jpeg",
            });

            formData.append("userToken", user.token);
            formData.append("idPlace", route.params.selectedPlace.id);

            const response = await fetch("https://roll-in-new-york-backend.vercel.app/favorites/pictures", {
              method: "POST",
              body: formData,
            });

            const data = await response.json();

            if (data.url) {
              dispatch(addPicture(data.url));
              uploadSuccess++;
            }
          } catch (error) {
            console.error("Problem during upload", error);
          }
        }
        if (uploadSuccess > 0) {
          Alert.alert("Upload finished");
          setPictures((prevPictures) => [...prevPictures]);
          setLoading(true);

          setRefreshGallery((prev) => prev + 1);
        } else {
          Alert.alert("No photo has been uploaded. Try again.");
        }
      }
    } catch (error) {
      console.error("Problem during selection picture(s)", error);
      Alert.alert("Problem during selection of the picture(s). Try again.");
    }
  };

  const manualRefresh = async () => {
    setLoading(true);
    setRefreshGallery((prev) => prev + 1);
  };

  return (
    <>
      <View style={styles.container}>
        <Header title="Memories" showInput={false} />
        <View style={styles.memoriesContainer}>
          {placeCard}
          <View style={styles.postReview}>
            <Text style={styles.title}>My review</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Write your review"
                onChangeText={(value) => setNewReviewText(value)}
                value={newReviewText}
              ></TextInput>
              <View style={styles.starContainer}>{personalStars}</View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.postButton} onPress={() => handlePostReview()}>
                  <Text style={styles.textButton}>Post review</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.buttonPictures}>
            <TouchableOpacity style={styles.buttonUpload} onPress={() => handleFilePick()}>
              <FontAwesomeIcon icon={faUpload} size={30} color="#DEB973" />
            </TouchableOpacity>
            <View style={styles.buttonPictureSeparator}></View>
            <TouchableOpacity style={styles.buttonPicture} onPress={() => handleCamera()}>
              <FontAwesomeIcon icon={faCamera} size={30} color="#DEB973" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={manualRefresh}>
            <Text style={styles.refreshButton}>Refresh Gallery</Text>
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator size="large" color="#001F3F" style={{ marginTop: 10 }} />
          ) : pictures.length === 0 ? (
            <Text style={{ marginTop: 10 }}>No pictures available.</Text>
          ) : (
            <View style={styles.gallery}>
              <MasonryList
                key={refreshGallery}
                images={pictures}
                columns={3}
                spacing={2}
                backgroundColor={"#EFEFEF"}
                style={{ backgroundColor: "#EFEFEF" }}
                onPressImage={(image) => {
                  setSelectedImage(image);
                  setViewPictures(true);
                }}
              />
            </View>
          )}
        </View>
      </View>

      <Picture isOpen={viewPictures} onClose={() => setViewPictures(false)} selectedImage={selectedImage} />
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
  memoriesContainer: {
    flex: 1,
    marginTop: 200,
    paddingTop: 5,
    alignItems: "center",
  },
  buttonPictures: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#001F3F",
    width: Dimensions.get("window").width - 80,
    height: "7%",
    borderRadius: 50,
  },
  buttonPictureSeparator: {
    height: "100%",
    width: "1.5%",
    backgroundColor: "#DEB973",
  },
  buttonPicture: {
    marginRight: 60,
  },
  buttonUpload: {
    marginLeft: 60,
  },
  refreshButton: {
    color: "#001F3F",
  },
  gallery: {
    marginTop: 5,
    width: "100%",
    height: "50%",
  },
  postReview: {
    width: Dimensions.get("window").width - 50,
    height: 140,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: "#282C37",
    backgroundColor: "white",
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: "JosefinSans-Bold",
    color: "black",
    marginRight: 8,
  },
  inputContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderRadius: 20,
    height: 40,
  },
  input: {
    width: "100%",
    height: "100%",
  },
  starContainer: {
    width: "100%",
    height: 30,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    height: 30,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  postButton: {
    backgroundColor: "#001F3F",
    width: "30%",
    height: "100%",
    borderRadius: 20,
    justifyContent: "center",
    marginBottom: 5,
  },
  textButton: {
    color: "#DEB973",
    textAlign: "center",
  },
});
