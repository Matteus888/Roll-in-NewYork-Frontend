import { StyleSheet, Dimensions, View, TouchableOpacity, Text, TextInput } from "react-native";
import PlaceCard from "../components/PlaceCard";
import Header from "../components/Header";
import { useState } from "react";
import MemoriesCamera from "../components/Camera";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"; // Import pour les icons
import { faCamera, faUpload, faStar } from "@fortawesome/free-solid-svg-icons"; // Import pour les icons

export default function MemoriesScreen({route, navigation}) {
    
    const [isPicture, setIsPicture] = useState(false);
    const [personalNote, setPersonalNote] = useState(0)

    const { selectedPlace } = route.params;
    const movieCard = (
      <PlaceCard
        id={selectedPlace.id}
        title={selectedPlace.title}
        image={selectedPlace.image}
        description={selectedPlace.description}
      ></PlaceCard>
    );

    const handleCameraClose = () => {
        setIsPicture(false); // Réinitialiser isPicture à false lorsque la caméra est fermée
    };

    //mise en place des étoile pour noter le lieu
    const personalStars = []
    for (let i=0; i<5; i++){
      let style={color : "#EFEFEF"}
      if(i<personalNote) {
        style={color: "#DEB973"}
      }
      personalStars.push(
        <TouchableOpacity onPress={()=> setPersonalNote(i+1)} >
          <FontAwesomeIcon
          key={`starIndex: ${i}`}
          icon={faStar}
          style={style}
          size={30}
          />
        </TouchableOpacity>
      )
    }

    const handlePostReview = () => {}
      
    return (
        isPicture ? (
          <MemoriesCamera 
            idPlace={route.params.selectedPlace.id} 
            navigation={navigation} 
            onClose={handleCameraClose} // Passer la fonction pour réinitialiser
          />
        ) : (
          <View style={styles.container}>
            <Header title="Memories" showInput={false} />
            <View style={styles.memoriesContainer}>
              {movieCard}
              <View style={styles.postReview} >
                <Text style= {styles.title}>My review</Text>
                <View style={styles.inputContainer} >
                <TextInput style={styles.input} placeholder="Write your review" ></TextInput>
                <View style={styles.starContainer} >
                  {personalStars}
                </View>
                <View style={styles.buttonContainer} >
                  <TouchableOpacity style={styles.postButton}>
                  <Text style={styles.textButton}>Post review</Text>
                  </TouchableOpacity>
                </View>
                </View>

              </View>
              <View style={styles.buttonPictures}>
                <TouchableOpacity style={styles.buttonUpload} onPress={() => console.log('upload')}>
                  <FontAwesomeIcon icon={faUpload} size={35} color="#DEB973" />
                </TouchableOpacity>
                <View style={styles.buttonPictureSeparator}></View>
                <TouchableOpacity style={styles.buttonPicture} onPress={() => setIsPicture(true)}>
                  <FontAwesomeIcon icon={faCamera} size={40} color="#DEB973" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
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
        height: "10%",
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
    postReview:{
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
    title:{
      fontSize: 18,
      fontFamily: "JosefinSans-Bold",
      color: "black",
      marginRight: 8,
    },
    inputContainer:{
      width:"100%",
      borderBottomWidth: 1,
      borderRadius: 20,
      height: 40
    },
    input:{
      width: '100%',
      height: '100%',
    },
    starContainer:{
      width:"100%",
      height: 30,
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center"
    },
    buttonContainer :{
      width:"100%",
      height: 30,
      marginTop: 5,
      justifyContent:'center',
      alignItems:"flex-start",
    },
    postButton:{
      backgroundColor: "#001F3F",
      width: "30%",
      height: "100%",
      borderRadius: 20,
      justifyContent: "center",
      marginBottom: 5
    },
    textButton: {
      color: "#DEB973",
      textAlign: "center",
    },
});