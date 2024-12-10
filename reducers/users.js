import { createSlice } from "@reduxjs/toolkit";

const initialState = { // Initialisation de l'utilisateur avec des valeurs nulles par défaut
    value: {username: null, email: null, token: null}
}

export const userSlice = createSlice({ // Création du slice pour l'utilisateur
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => { // Fonction pour connecter l'utilisateur
            state.value.username = action.payload.username;
            state.value.email = action.payload.email;
            state.value.token = action.payload.token;
        }
    }
})

export const { login } = userSlice.actions;
export default userSlice.reducer;