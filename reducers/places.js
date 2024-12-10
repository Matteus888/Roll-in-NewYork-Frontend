const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    value: [],
}

export const placeSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {
        addMovie: (state, action) => {
            const { id, title, poster_path, overview, release_date } = action.payload; 
            state.value.push({ id, title, poster_path, overview, release_date });
          },
        removeMovie: (state) => {
            state.value.filter((movie) => movie.id !== action.payload.id);
        },
        removeAllMovies: (state) => {
            state.value = [];
        }
    }
})

export const { addMovie, removeMovie, removeAllMovies } = placeSlice.actions;
export default placeSlice.reducer;