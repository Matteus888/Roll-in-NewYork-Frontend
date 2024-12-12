import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Initialisation de l'utilisateur avec des valeurs nulles par défaut
  value: { username: null, email: null, token: null },
};

export const userSlice = createSlice({
  // Création du slice pour l'utilisateur
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      // Fonction pour connecter l'utilisateur
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
    },
    logout: (state) => {
      // Fonction pour déconnecter l'utilisateur
      state.value.username = null;
      state.value.email = null;
      state.value.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
