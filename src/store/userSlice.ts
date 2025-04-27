import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    email: string;
    role: string;
    fullName: string;
    description: string;
}

const initialState: UserState = {
    email: "",
    role: "",
    fullName: "",
    description: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.fullName = action.payload.fullName;
            state.description = action.payload.description;
        },
        clearUser(state) {
            state.email = "";
            state.role = "";
            state.fullName = "";
            state.description = "";
        },
        updateUser(state, action: PayloadAction<Partial<UserState>>) {
            if (action.payload.email) state.email = action.payload.email;
            if (action.payload.fullName) state.fullName = action.payload.fullName;
            if (action.payload.role) state.role = action.payload.role;
            if (action.payload.description) state.description = action.payload.description;
        },
    },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
