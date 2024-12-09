import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacity, TextInput } from "react-native";

export default function SignIn({ isOpen, onClose }) {

    if (!isOpen) {
        return null;
    }

    return (
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modal}>
                <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={styles.modalContent}>
                        <View style={styles.container}>
                            <View>
                                <Text>test</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput style={styles.inputText} placeholder="Email"></TextInput>
                                <TextInput style={styles.inputText} placeholder="Mot de passe"></TextInput>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
                            <Text style={styles.textButton}>SIGN-IN</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Corriger 'rgba' en ajoutant les guillemets
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        height: '70%',
        backgroundColor: 'white',
        borderWidth: 4,
        borderColor: '#001F3F',
        borderRadius: 10,
        padding: 20,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'green'
    },
    inputContainer: {
        width: '90%'
    },
    inputText: {
        height: '30%',
        borderWidth: 2,
        borderColor: '#001F3F',
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: 'red'
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
        width: '70%',
        backgroundColor: '#001F3F',
        borderRadius: 50,
    },
    textButton: {
        color: '#DEB973',
        fontWeight: 'bold'
    },
});
