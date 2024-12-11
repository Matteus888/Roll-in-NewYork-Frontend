const { createSlice } = require('@reduxjs/toolkit');

const initialState = { // Initialisation de l'utilisateur avec un tableau vide par défaut
    value: [],
}

export const movieSlice = createSlice({ // Création du slice pour les lieux
    name: 'movie',
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

export const { addMovie, removeMovie, removeAllMovies } = movieSlice.actions;
export default movieSlice.reducer;