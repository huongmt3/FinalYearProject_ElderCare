import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    email: string;
    role: string;
}

const initialState: UserState = {
    email: "",
    role: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
        clearUser(state) {
            state.email = "";
            state.role = "";
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
