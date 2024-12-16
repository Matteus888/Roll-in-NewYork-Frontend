const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  // Initialisation de l'utilisateur avec un tableau vide par défaut
  value: "",
};

export const favoriteSlice = createSlice({
  // Création du slice pour les lieux en favoris
  name: "favorite",
  initialState,
  reducers: {
    addPlaceToFavorites: (state, action) => {
      // Fonction pour ajouter un lieu en favoris
      state.value = action.payload;
    },
    removePlaceToFavorites: (state, action) => {
      // Fonction pour supprimer un lieu des favoris
      state.value = action.payload;
    },
  },
});

export const { addPlaceToFavorites, removePlaceToFavorites } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
