import { createSlice } from "@reduxjs/toolkit";

export const loanAdminSlice = createSlice({
    name: "loansAdmin",
        initialState: {
            value: [],
        },
    reducers: {
        loanSync: (state, action) => {
        state.value = action.payload;
        },
        loanDel: (state) => {
            state.value = []
        },
    },
});

// Action creators are generated for each case reducer function
export const { loanSync, loanDel } = loanAdminSlice.actions;

export default loanAdminSlice.reducer;
