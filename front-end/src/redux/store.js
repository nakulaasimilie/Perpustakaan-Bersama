import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import bookSlice from "./bookSlice";
import adminSlice from "./admin/adminSlice";
import listSlice from "./admin/listSlice";
import nameSlice from "./nameSlice";
import cartSlice from "./cartSlice";
import loanSlice from "./loanSlice";
import loanAdminSlice from "./admin/loanAdminSlice";

export default configureStore({
  reducer: {
    userSlice,
    bookSlice,
    adminSlice,
    listSlice,
    nameSlice,
    cartSlice,
    loanSlice,
    loanAdminSlice
  },
});
