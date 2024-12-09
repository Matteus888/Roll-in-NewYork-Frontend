import { Dimensions, StyleSheet, View, TouchableOpacity, Text, Image } from "react-native"
import GoogleIcon from '../assets/icons/google.png'
import AppleIcon from '../assets/icons/apple.png'
import InstagramIcon from '../assets/icons/instagram.png'

export default function LoginScreen () {
    return (
        <View style={styles.container}>
            <View style={styles.signContainer}>
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textButton}>SIGN-IN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textButton}>SIGN-UP</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separateContainer}>
                <View style={styles.separateBar}></View>
                <Text style={styles.separateText}>OU</Text>
                <View style={styles.separateBar}></View>
            </View>
            <View style={styles.methodConnexionContainer}>
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.methodConnexionButton} activeOpacity={0.8}>
                    <Image style={styles.icon} source={GoogleIcon}/>
                    <Text style={styles.methodConnexionTextButton}>Sign with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.methodConnexionButton} activeOpacity={0.8}>
                    <Image style={styles.icon} source={AppleIcon}/>
                    <Text style={styles.methodConnexionTextButton}>Sign with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.methodConnexionButton} activeOpacity={0.8}>
                    <Image style={styles.icon} source={InstagramIcon}/>
                    <Text style={styles.methodConnexionTextButton}>Sign with Instagram</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: '#EFEFEF'
    },
    signContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '20%',
        width: '100%',
        marginBottom: '5%',
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30%',
        width: '70%',
        backgroundColor: '#001F3F',
        borderRadius: 50,
    },
    textButton: {
        color: '#DEB973',
        fontWeight: 'bold'
    },
    separateContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '50%'
    },
    separateBar: {
        height: '20%',
        width: '35%',
        backgroundColor: '#001F3F',
        borderRadius: 20,
    },
    separateText: {
        color: '#001F3F',
        fontWeight: 'bold'
    },
    methodConnexionContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '30%',
        width: '100%',
    },
    methodConnexionButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '20%',
        width: '55%',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 50,
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        marginRight: 10,
    },
    methodConnexionTextButton: {
        alignItems: 'center',
        marginRight: 45,
    }
})