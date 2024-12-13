import { StyleSheet, Dimensions, View, TouchableOpacity, Text, TextInput, ActivityIndicator } from "react-native";
import PlaceCard from "../components/PlaceCard";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; // Import pour les icons
import { faCamera, faUpload, faStar } from "@fortawesome/free-solid-svg-icons"; // Import pour les icons
import MasonryList from "react-native-masonry-list";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Picture from "../components/Picture";

export default function MemoriesScreen({ route, navigation }) {
  const user = useSelector((state) => state.user.value);
  const { selectedPlace } = route.params;

  //mise en place des états pour moster un nouvel avis
  const [personalNote, setPersonalNote] = useState(0);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewPictures, setViewPictures] = useState(false);
  const [selectedImage, setSelectedImage] = useState(""); // État pour l'URL de l'image sélectionnée
  const [newReviewText, setNewReviewText] = useState('')

  const placeCard = (
    <PlaceCard
      key={selectedPlace.id}
      id={selectedPlace.id}
      title={selectedPlace.title}
      image={selectedPlace.image}
      description={selectedPlace.description}
    ></PlaceCard>
  );

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
  }, [route.params.selectedPlace.id, user.token]);

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
      content: newReviewText
    }
    if(newReviewText === ''){
      console.log("please write something")
      return
    }else{
      fetch(`https://roll-in-new-york-backend.vercel.app/reviews/${user.token}/${selectedPlace.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReviewData)
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("review posted!", data)
        setNewReviewText("")
        setPersonalNote(0)
      })
    }
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
              <TextInput style={styles.input} 
              placeholder="Write your review" 
              onChangeText={(value) => setNewReviewText(value)} 
              value={newReviewText}>
              </TextInput>
              <View style={styles.starContainer}>{personalStars}</View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.postButton} onPress={() => handlePostReview()} >
                  <Text style={styles.textButton}>Post review</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.buttonPictures}>
            <TouchableOpacity style={styles.buttonUpload} onPress={() => console.log("upload")}>
              <FontAwesomeIcon icon={faUpload} size={30} color="#DEB973" />
            </TouchableOpacity>
            <View style={styles.buttonPictureSeparator}></View>
            <TouchableOpacity style={styles.buttonPicture} onPress={() => handleCamera()}>
              <FontAwesomeIcon icon={faCamera} size={30} color="#DEB973" />
            </TouchableOpacity>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#001F3F" style={{ marginTop: 10 }} />
          ) : (
            <View style={styles.gallery}>
              <MasonryList
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
    elevation: 5,
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
