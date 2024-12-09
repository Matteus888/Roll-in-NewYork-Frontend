import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {username: null, email: null, token: null}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.value.username = action.payload;
            state.value.email = null;
            state.value.token = null;
        }
    }
})

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;