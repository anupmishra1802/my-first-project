import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Authentication actions
        authStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        authSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        authFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Update user actions
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Logout action
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
    },
});

// Export actions
export const { 
    authStart, authSuccess, authFailure, 
    updateUserStart, updateUserSuccess, updateUserFailure, 
    logout 
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
