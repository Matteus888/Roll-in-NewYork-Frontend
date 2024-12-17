// Réalisation des différents imports
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native"; // Import pour react / react-native
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; // Import pour les icons
import { faHeart, faStar, faImage } from "@fortawesome/free-solid-svg-icons"; // Import pour les icons
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPlaceToFavorites, removePlaceToFavorites } from "../reducers/favorites";
import { usePlanDayContext, usePopupContext } from "../provider/AppProvider";

// Création de la card représentant les lieux de tournage référencés
export default function PlaceCard({ id, image, title, description, navigation }) {
  const user = useSelector((state) => state.user.value);
  const favorite = useSelector((state) => state.favorite.value )
  const nav = useNavigation();
  const { activePopupId, setActivePopupId } = usePopupContext();
  const [likeStyle, setLikeStyle] = useState({ color: "white" });
  const [isLiked, setIsLiked] = useState(false);
  const [placeNote, setPlaceNote] = useState(0); //pour affichage de la note
  const [reviewsTable, setReviewsTable] = useState([]); //pour récupérer les avis du lieu
  const { isPlanDay } = usePlanDayContext();

  const [fontsLoaded] = useFonts({
    // Chargement des fonts personnalisés
    "JosefinSans-Bold": require("../assets/fonts/JosefinSans-Bold.ttf"),
  });

  const dispatch = useDispatch();
  const popupVisible = activePopupId === id;
  //stockage des infos de la placeCard dans une variable:
  const placeInfo = { id, image, title, description };

  // mettre à jour la couleur du coeur en fonction de isLiked
  useEffect(() => {
    (async () => {
      fetch(`https://roll-in-new-york-backend.vercel.app/users/isLiked/${user.token}/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setIsLiked(true);
            setLikeStyle({ color: "red" });
          } else {
            setIsLiked(false);
            setLikeStyle({ color: "white" });
          }
        })
        .catch((err) => console.error("Error checking like status:", err));
    })();

  }, [user.token, id, favorite]); 
  //force le rafraichissement de la placeCard en fonction de l'id du lieu, son status like, de la note et en fonction du user

  const togglePopup = () => {
    if (isPlanDay) {
      return;
    } else {
      setActivePopupId(popupVisible ? null : id); // Ferme si déjà ouvert, sinon ouvre
    }
  };

  const handleLike = () => {
    setActivePopupId(null);

    if (user.token === null) {
      navigation.navigate("Login", { navigation });
      return;
    }
    try {
      fetch(`https://roll-in-new-york-backend.vercel.app/users/likePlace/${user.token}/${id}`, {
        method: "PUT",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "Added") {
            dispatch(addPlaceToFavorites(id));
            setLikeStyle({ color: "red" });
            setIsLiked(true);
          } else if (data.status === "Removed") {
            dispatch(removePlaceToFavorites(id+1));
            setLikeStyle({ color: "white" });
            setIsLiked(false);
          }
        })
        .catch((err) => console.error("Error during fetch data", err));
    } catch (err) {
      console.error("Error during fetch data", err);
    }
  };

  const goToMemories = () => {
    const selectedPlace = { id, image, title, description };
    navigation.navigate("Memories", { selectedPlace });
    setActivePopupId(null);
  };

  useEffect(() => {
    // récupération des reviews du lieu pour affichage de la note
    fetch(`https://roll-in-new-york-backend.vercel.app/reviews/${placeInfo.id}`)
      .then((response) => response.json())
      .then((data) => {
        setReviewsTable(data.reviews);
      });
  }, [placeInfo.id]);

  let allNotes;
  let averageNote;
  // fonction pour récupérer la moyenne des notes
  let getAverage = (table) => table.reduce((a, b) => a + b) / allNotes.length;

  //récupération des notes des avis du lieux et affichage de la moyenne si il y a des avis sur le lieu
  useEffect(() => {
    if (reviewsTable.length === 0) {
      setPlaceNote(0)
      return;
    } else {
      allNotes = reviewsTable.map((review) => {
        return review.note;
      });
      averageNote = getAverage(allNotes);
      if (Number.isInteger(averageNote)) {
        setPlaceNote(getAverage(allNotes));
      } else {
        setPlaceNote(getAverage(allNotes).toFixed(1));
      }
    }

  }, [reviewsTable]);



  const handleReviews = () => {
    navigation.navigate("Reviews", { placeInfo });
    setActivePopupId(null);
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => (nav.getState().routes[nav.getState().index].name === "Memories" ? null : togglePopup())}
      >
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          <View style={styles.verticalBar}></View>
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {title}
              </Text>
              <TouchableOpacity style={styles.iconTouchBox}>
                <FontAwesomeIcon icon={faHeart} size={10} style={isLiked ? { color: "red" } : likeStyle} />
                <FontAwesomeIcon icon={faStar} size={12} color="#DEB973" />
                <Text>{placeNote}/5</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.description} numberOfLines={3}>
              {description}
            </Text>
          </View>
        </View>
      </Pressable>

      {popupVisible && (
        <View style={styles.popup}>
          <TouchableWithoutFeedback onPress={() => setActivePopupId(null)}>
            <View style={styles.popupContent}>
              <TouchableOpacity onPress={handleLike} style={styles.popupButton} activeOpacity={0.8}>
                <FontAwesomeIcon icon={faHeart} size={40} style={likeStyle} />
                <Text style={styles.popupText}>Favourites</Text>
              </TouchableOpacity>
              <View style={styles.popupSeparator}></View>
              {user.token !== null && isLiked == true && (
                <>
                  <TouchableOpacity onPress={goToMemories} style={styles.popupButton} activeOpacity={0.8}>
                    <FontAwesomeIcon icon={faImage} size={40} color="#4198f0" />
                    <Text style={styles.popupText}>Memories</Text>
                  </TouchableOpacity>
                  <View style={styles.popupSeparator}></View>
                </>
              )}
              <TouchableOpacity
                onPress={() => handleReviews()}
                style={styles.popupButton}
                activeOpacity={0.8}
              >
                <FontAwesomeIcon icon={faStar} size={40} color="#DEB973" />
                <Text style={styles.popupText}>Reviews</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
}
// Styles
const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  card: {
    width: Dimensions.get("window").width - 80,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 0.8,
    backgroundColor: "white",
    borderColor: "#282C37",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  popup: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: Dimensions.get("window").width - 80,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: "#282C37",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  popupContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  popupSeparator: {
    width: 30,
    marginHorizontal: 5,
  },
  popupButton: {
    alignItems: "center",
  },
  popupText: {
    color: "white",
    textAlign: "center",
  },
  imageContainer: {
    width: "30%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  verticalBar: {
    width: 1,
    backgroundColor: "#282C37",
    height: "75%",
    alignSelf: "center",
    marginHorizontal: 5,
  },
  textContainer: {
    width: "65%",
    paddingVertical: 5,
    justifyContent: "flex-start",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 1,
  },
  iconTouchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingRight: 2,
  },
  title: {
    fontSize: 18,
    fontFamily: "JosefinSans-Bold",
    flex: 1,
    color: "black",
    marginRight: 8,
  },
  description: {
    fontSize: 12,
    color: "black",
    marginTop: 2,
  },
});
