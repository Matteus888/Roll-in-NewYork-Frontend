import Header from "../components/Header";
import { View, StyleSheet, ScrollView } from "react-native";
import ReviewCard from "../components/ReviewCard";
import PlaceCard from "../components/PlaceCard";
import { useEffect, useState } from "react";


export default function ReviewsScreen({route, navigation}) {
    //récupération des info du lieu cliqué
    const {placeInfo} = route.params

    const [reviewsTable, setReviewsTable] = useState([]) //initiation du tableau des avis à afficher

    // fetch des avis du lieu
    useEffect(() => {
        fetch(`https://roll-in-new-york-backend.vercel.app/reviews/${placeInfo.id}`)
        .then((response) => response.json())
        .then((data)=> {
            setReviewsTable(data.reviews)
        })
        //lorsqu'on quitte la page on reset le tableau d'avis à un tableau vide
        return () => {setReviewsTable([])}
    }, [placeInfo])

    const reviews = reviewsTable.map((data, i) => {
        return (
            <ReviewCard 
            key={`reviewCardId: ${i}`} 
            userName= { data.user.username}
            date= {data.createdAt}
            note= {data.note}
            content= {data.content}
            />
        )
    })

    return (
        <View style={styles.container}>
            <View>
                <Header title="Reviews" showInput={false} navigation={navigation} />
            </View>
            <View style={styles.reviewsContainer} >
                <PlaceCard
                    id={placeInfo.id}
                    image={placeInfo.image}
                    title={placeInfo.title}
                    description={placeInfo.description}
                    navigation={navigation}
                />
                <View style={{ flex: 1, marginTop: 10 }} >
                    <ScrollView>{reviews}</ScrollView>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "flex-start",
    },
    reviewsContainer:  {
        flex: 1,
        marginTop: 200,
        paddingTop: 5,
        alignItems: "center",
    },
})