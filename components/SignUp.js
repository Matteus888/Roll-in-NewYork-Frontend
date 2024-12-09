import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";

export default function SignUp({ isOpen, onClose }) {

    if (!isOpen) {
        return null;
    }

    return (
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modal}>
                <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={styles.modalContent}>
                        {/* Ajoute ici ton contenu de modal */}
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
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    }
});
