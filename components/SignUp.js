import { useState } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../reducers/users";
import { Toast } from "toastify-react-native";
const tower = 'https://res.cloudinary.com/dtkac5fah/image/upload/v1733818367/appIcons/eh4j1tvmizqd9dwftj25.png';

export default function SignUp({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false, '');
    const [errorMessage, setErrorMessage] = useState('');

    if (!isOpen) {
        return null;
    }

    const handleSubmit = async () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (username === '' || email === '' || password === '') {
            setError(true);
            setErrorMessage("Veuillez remplir tous les champs");
            return;
        } else if (!regex.test(email) ) {
            setError(true);
            setErrorMessage("L'addresse email n'est pas valide");
            return;
        } else if (password !== confirmPassword) {
            setError(true);
            setErrorMessage("Les mots de passe ne correspondent pas");
        } else {
            setError(false);
            setErrorMessage('');
        }

        console.log('test')
        try {
            let response = await fetch('https://roll-in-new-york-backend.vercel.app/users/signup/classic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, email: email, password: confirmPassword })
            });
            
            if (response.ok) {
                let data = await response.json(); 
                if (data.result === true) {
                    Toast.success("Le compte a été créé", "top", { duration: 2000 });
                    dispatch(login({username: data.username, email: data.email, token: data.token}));
                    onClose();
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                } else {
                    console.log(data)
                    Toast.error("Échec de la connexion", "top", { duration: 2000 });
                }
            } else {
                console.log("❌ Database SignUp Error:", response.status);
                return;
            }
        } catch (err) {
            console.error("❌ Database SignUp Error:", err);
            Toast.error("Une erreur est survenue", { duration: 2000 });
        }
    };

    return (
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modal}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <View style={styles.container}>
                                <View style={styles.titleContainer}>
                                    <Image source={{uri: tower}} height={70} width={40} style={styles.logo} />
                                    <Text style={styles.title}>Connexion</Text>
                                </View>
                                {error && <Text style={styles.error}>{errorMessage}</Text>}
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputText} placeholder="Name" onChangeText={(value) => setUsername(value)} value={username}/>
                                    <TextInput style={styles.inputText} placeholder="Email" onChangeText={(value) => setEmail(value)} value={email}/>
                                    <TextInput style={styles.inputText} placeholder="Password" secureTextEntry={true} onChangeText={(value) => setPassword(value)} value={password}/>
                                    <TextInput style={styles.inputText} placeholder="Confirm password" secureTextEntry={true} onChangeText={(value) => setConfirmPassword(value)} value={confirmPassword}/>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
                                <Text style={styles.textButton}>SIGN-UP</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerKeyboardAvoidingView: {
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#001F3F',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    container: {
        width: '100%',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        resizeMode: "contain",
        marginRight: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '100%',
    },
    inputText: {
        height: 50,
        borderWidth: 2,
        borderColor: '#001F3F',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        marginTop: 20,
        height: 50,
        width: '80%',
        backgroundColor: '#001F3F',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: '#DEB973',
        fontWeight: 'bold',
    },
    error: {
        marginTop: 10,
        color: 'red',
    },
});
