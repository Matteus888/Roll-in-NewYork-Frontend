import { View, SafeAreaView, StyleSheet, Image, Text } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Header from "../components/Header";
import { useState, useEffect } from "react";

// icons pour les marker sur la maps (man pour localisation user, moviePlace pour les lieux)
import manWalking from '../assets/icons/man.png' 
import moviePlace from '../assets/icons/moviePlace.png'


export default function HomeScreen() {

// initiation du tableau de lieux à afficher sur la carte
    const [places, setPlaces] = useState([])

// initiation des coordonnées de localisation de l'utilisateur
    const [currentPosition, setCurrentPosition] = useState(null);

// demande de permission de localisation et récupération des coordonnées de l'utilisateur
    useEffect(() => {
        (async () => {
            const result = await Location.requestForegroundPermissionsAsync();
            const status = result?.status;

            if (status === "granted") {
                Location.watchPositionAsync(
                    { distanceInterval: 10 },
                    (location) => {
                        setCurrentPosition(location.coords);
                    }
                );
            }
        })();
    }, []);

    // mise en place du fetch pour récupérer les lieux et les afficher sur la carte
    useEffect(() => {
        fetch('https://roll-in-new-york-backend-mk511sfxd-0xk0s-projects.vercel.app/places')
        .then((response) => response.json())
        .then((data) => {
            setPlaces(data.places)
        })
    }, [])

    const placesMarker = places.map((data, i) => {
        return (
            <Marker
            key={i}
            coordinate={{
                latitude: data.coords.lat,
                longitude: data.coords.lon
            }}
            title={data.title}
            image={moviePlace || null}
            />
        )
    })

    return (
        <View style={styles.container}>
            <View>
                <Header />
            </View>
            <View style={styles.mapContainer}>
                <MapView
                // force la map à se recharger si changement dans le fetch, évite la disparition des marker
                key={`map-${places.length}`}
                // focus au dessus de central park
                    initialRegion={{
                        latitude: 40.7857122,
                        longitude: -73.9745249,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    style={styles.map}
                >
                    <Marker
                    // marker "en dur" pour localisation de l'utilisateur dans central park si pas à new york
                        coordinate={{
                            latitude: 40.772087,
                            longitude: -73.973159,
                        }}
                        image={manWalking || null}
                    />
                    {placesMarker}
                </MapView>
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
    mapContainer: {
        width: "100%",
        height: "75%",
        marginTop: 200,
    },
    map: {
        flex: 1,
    },
});
