import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "./redux/userSlice";
import NavbarComp from "./components/NavbarComp";
import { AdminPage } from "./pages/AdminPage";
import { VerificationPage } from "./pages/verificationPage";
import DetailPage from "./pages/DetailPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import cartSync from "./redux/cartSlice";
import { loanSync } from "./redux/loanSlice";
import CartPage from "./pages/CartPage";
import LoanPage from "./pages/LoanPage";
import { loginAdmin } from "./redux/adminSlice";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const tokenAdmin = localStorage.getItem("tokenAdmin");
  const { NIM } = useSelector((state) => state.userSlice.value);

  const keepLogin = async () => {
    try {
      const res = await Axios.get(`http://localhost:2000/user/keepLogin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await Axios.get(
        `http://localhost:2000/cart/${res.data.NIM}`
      );
      dispatch(cartSync(result.data));

      const loan = await Axios.get(
        `http://localhost:2000/loan/${res.data.NIM}`
      );
      dispatch(loanSync(loan.data));

      dispatch(
        login({
          NIM: res.data.NIM,
          username: res.data.username,
          email: res.data.email,
          isVerified: res.data.isVerified,
          cart: result.data.length,
          loan: loan.data.length,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const keepLoginAdmin = async () => {
    try {
      const res = await Axios.get(`http://localhost:2000/admin/keepLogin`, {
        headers: {
          Authorization: `Bearer ${tokenAdmin}`,
        },
      });
      dispatch(
        loginAdmin({
          username: res.data.username,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    tokenAdmin
      ? keepLoginAdmin()
      : token
      ? keepLogin()
      : console.log("Open Library");
  });

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavbarComp />
              <HomePage />
            </>
          }
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route
          path="/cart"
          element={
            <>
              <NavbarComp />
              <CartPage />
            </>
          }
        />
        <Route
          path="/loan"
          element={
            <>
              <NavbarComp />
              <LoanPage />
            </>
          }
        />
        <Route path="/verification/:token" element={<VerificationPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
