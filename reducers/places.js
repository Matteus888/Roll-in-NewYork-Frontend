const { createSlice } = require('@reduxjs/toolkit');

const initialState = { // Initialisation de l'utilisateur avec un tableau vide par défaut
    value: [],
}

export const placeSlice = createSlice({ // Création du slice pour les lieux
    name: 'place',
    initialState,
    reducers: {
        addMovie: (state, action) => { // Fonction pour ajouter un film
            const { id, title, poster_path, overview, release_date } = action.payload; 
            state.value.push({ id, title, poster_path, overview, release_date });
          },
        removeMovie: (state) => { // Fonction pour supprimer un film
            state.value.filter((movie) => movie.id !== action.payload.id);
        },
        removeAllMovies: (state) => { // Fonction pour supprimer tous les films
            state.value = [];
        }
    }
})

export const { addMovie, removeMovie, removeAllMovies } = placeSlice.actions;
export default placeSlice.reducer;