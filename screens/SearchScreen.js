import { StyleSheet, View, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

import Header from "../components/Header";
import PlaceCard from "../components/PlaceCard";
import MovieCard from "../components/MovieCard";

const { width } = Dimensions.get("window");

export default function SearchScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardsData = [
    {
      id: "1",
      image: "https://via.placeholder.com/300x200.png?text=Image+1",
      title: "Card 1",
      description: "Description de la première carte.",
    },
    {
      id: "2",
      image: "https://via.placeholder.com/300x200.png?text=Image+2",
      title: "Card 2",
      description: "Description de la deuxième carte.",
    },
    {
      id: "3",
      image: "https://via.placeholder.com/300x200.png?text=Image+3",
      title: "Card 3",
      description: "Description de la troisième carte.",
    },
  ];
  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % cardsData.length;
    setCurrentIndex(nextIndex);
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + cardsData.length) % cardsData.length;
    setCurrentIndex(prevIndex);
  };

  return (
    <>
      <View style={styles.container}>
        <Header />
        <View style={styles.searchScreenContainer}>
          <MovieCard />

          <View style={styles.carouselWrapper}>
            <TouchableOpacity onPress={goToPrevious} style={styles.navigationButtonLeft}>
              <FontAwesomeIcon icon={faChevronLeft} size={20} color="black" />
            </TouchableOpacity>

            <FlatList
              data={cardsData}
              horizontal
              renderItem={({ item, index }) =>
                index === currentIndex ? (
                  <View style={styles.cardWrapper}>
                    <PlaceCard key={item.id} image={item.image} title={item.title} description={item.description} />
                  </View>
                ) : null
              }
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              snapToInterval={width}
              contentContainerStyle={{ justifyContent: "center" }}
            />

            <TouchableOpacity onPress={goToNext} style={styles.navigationButtonRight}>
              <FontAwesomeIcon icon={faChevronRight} size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.pagination}>
            {cardsData.map((_, index) => (
              <View key={index} style={[styles.pageLine, currentIndex === index && styles.activePageLine]} />
            ))}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchScreenContainer: {
    flex: 1,
    marginTop: 200,
    paddingTop: 5,
    alignItems: "center",
  },
  carouselWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardWrapper: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  pageLine: {
    width: 30,
    height: 4,
    backgroundColor: "#ccc",
    marginVertical: 1,
    marginHorizontal: 5,
    borderRadius: 2,
  },
  activePageLine: {
    backgroundColor: "#001F3F",
  },
  navigationButtonLeft: {
    position: "absolute",
    left: 2,
    zIndex: 1,
    padding: 10,
    borderRadius: 20,
  },
  navigationButtonRight: {
    position: "absolute",
    right: 2,
    zIndex: 1,
    padding: 10,
    borderRadius: 20,
  },
});
