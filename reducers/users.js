import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {username: null, email: null, token: null}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.username = action.payload.username;
            state.value.email = action.payload.email;
            state.value.token = action.payload.token;
        }
    }
})

export const { login } = userSlice.actions;
export default userSlice.reducer;