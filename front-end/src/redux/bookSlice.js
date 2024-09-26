import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "books",
  initialState: {
    value: [],
  },
  reducers: {
    syncData: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { syncData, edit } = bookSlice.actions;

export default bookSlice.reducer;
