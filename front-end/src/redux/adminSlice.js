import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: "",
    email: "",
  },
};

export const adminSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.username = action.payload.username;
    },
    logout: (state) => {
      state.value.username = "";
    },
  },
});

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;
