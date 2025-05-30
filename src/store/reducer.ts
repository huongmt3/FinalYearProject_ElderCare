import { combineReducers, createSlice } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// Create a UI slice for frontend-only state management
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    theme: "light",
    sidebarOpen: false,
    // Add other UI state as needed
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    // Add other UI actions as needed
  },
});

export const { toggleTheme, toggleSidebar } = uiSlice.actions;

const reducers = {
  ui: uiSlice.reducer,
  user: userReducer,
  // You can add other non-backend related reducers here
};

export default combineReducers(reducers);