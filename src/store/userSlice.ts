import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    email: string;
    role: string;
    fullName: string;
    description: string;
    pricing: string;
    availableTimes: string[];
}

const initialState: UserState = {
    email: "",
    role: "",
    fullName: "",
    description: "",
    pricing: "",
    availableTimes: [],
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
            state.pricing = action.payload.pricing;
            state.availableTimes = action.payload.availableTimes;
        },
        clearUser(state) {
            state.email = "";
            state.role = "";
            state.fullName = "";
            state.description = "";
            state.pricing = "";
            state.availableTimes = [];
        },
        updateUser(state, action: PayloadAction<Partial<UserState>>) {
            if (action.payload.email) state.email = action.payload.email;
            if (action.payload.fullName) state.fullName = action.payload.fullName;
            if (action.payload.role) state.role = action.payload.role;
            if (action.payload.description) state.description = action.payload.description;
            if (action.payload.pricing) state.pricing = action.payload.pricing;
            if (action.payload.availableTimes) state.availableTimes = action.payload.availableTimes;
        },
    },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
