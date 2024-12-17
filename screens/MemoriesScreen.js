import { StyleSheet, Dimensions, View, TouchableOpacity, Text, TextInput, ActivityIndicator } from "react-native";
import PlaceCard from "../components/PlaceCard";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera, faUpload, faStar } from "@fortawesome/free-solid-svg-icons";
import MasonryList from "react-native-masonry-list";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPicture } from "../reducers/pictures";
import { useFonts } from "expo-font";
import { Toast } from "toastify-react-native";
import Picture from "../components/Picture";
import * as ImagePicker from "expo-image-picker";

export default function MemoriesScreen({ route, navigation }) {
  const user = useSelector((state) => state.user.value);
  const { selectedPlace } = route.params;
  const dispatch = useDispatch();

  const [personalNote, setPersonalNote] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewPictures, setViewPictures] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshGallery, setRefreshGallery] = useState(0);

  const [fontsLoaded] = useFonts({
    "JosefinSans-Bold": require("../assets/fonts/JosefinSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await fetch(`https://roll-in-new-york-backend.vercel.app/favorites/pictures/${user.token}/${selectedPlace.id}`);
        const data = await response.json();
        const newPictures = data.urls.map((secure_url) => ({
          uri: secure_url.secure_url,
          publicId: secure_url.public_id,
        }));
        setPictures(newPictures);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching memories:", err);
        setLoading(false);
      }
    };

    fetchPictures();

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
    navigation.navigate("Camera", { selectedPlace });
  };

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
        .then(() => {
          Toast.success("Review posted!", "top", { duration: 2000 });
          setNewReviewText("");
          setPersonalNote(0);
          setRefreshKey((prev) => prev + 1);
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
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Toast.error("Permission denied. We need your permission to access your gallery", "top", {
          duration: 2000,
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.5,
      });

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
            formData.append("idPlace", selectedPlace.id);

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
          Toast.success("Photo(s) uploaded !", "top", {
            duration: 2000,
          });
          setPictures((prevPictures) => [...prevPictures]);
          setLoading(true);
          setRefreshGallery((prev) => prev + 1);
        } else {
          Toast.error("Photo upload failed !. Try again.", "top", {
            duration: 2000,
          });
        }
      }
    } catch (error) {
      console.error("Problem during selection picture(s)", error);
      Toast.error("Problem during selection of the picture(s). Try again.", "top", {
        duration: 2000,
      });
    }
  };

  const manualRefresh = async () => {
    setLoading(true);
    setRefreshGallery((prev) => prev + 1);
  };

  const calculateImageSize = (photo) => {
    const { width, height } = photo;
    const aspectRatio = width / height;
    const newWidth = Dimensions.get("window").width / 3 - 4; // Largeur dynamique selon la grille
    const newHeight = newWidth / aspectRatio; // Calculer la hauteur en fonction du ratio

    return {
      width: newWidth,
      height: newHeight,
    };
  };

  return (
    <>
      <View style={styles.container}>
        <Header title="My Memories" showInput={false} />
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
              />
              <View style={styles.starContainer}>{personalStars}</View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.postButton} onPress={handlePostReview}>
                  <Text style={styles.textButton}>Post review</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.buttonPictures}>
            <TouchableOpacity style={styles.buttonUpload} onPress={handleFilePick}>
              <FontAwesomeIcon icon={faUpload} size={30} color="#DEB973" />
            </TouchableOpacity>
            <View style={styles.buttonPictureSeparator}></View>
            <TouchableOpacity style={styles.buttonPicture} onPress={handleCamera}>
              <FontAwesomeIcon icon={faCamera} size={30} color="#DEB973" />
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#001F3F" style={{ marginTop: 10 }} />
          ) : (
            <View style={styles.gallery}>
              {pictures.length === 0 && ( <Text style={styles.noPicture}>No pictures yet</Text> )}
              <MasonryList
                key={refreshGallery}
                images={pictures.map((picture) => {
                  const { width, height } = calculateImageSize(picture);
                  return { uri: picture.uri, width, height, publicId: picture.publicId };
                })}
                columns={3}
                spacing={1}
                refreshing={false}
                onRefresh={() => manualRefresh()}
                backgroundColor={"#EFEFEF"}
                style={{ backgroundColor: "#EFEFEF" }}
                onPressImage={(image) => {
                  setSelectedImage(image);
                  setViewPictures(true);
                }}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      </View>

      <Picture
        isOpen={viewPictures}
        onClose={() => setViewPictures(false)}
        onDelete={() => setRefreshGallery((prev) => prev + 1)}
        selectedImage={selectedImage}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "#EFEFEF",
  },
  memoriesContainer: {
    flex: 1,
    marginTop: 200,
    paddingTop: 2,
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
  buttonUpload: {
    marginLeft: 65,
  },
  buttonPicture: {
    marginRight: 65,
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
  noPicture: {
    width: "100%",
    textAlign: "center",
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
