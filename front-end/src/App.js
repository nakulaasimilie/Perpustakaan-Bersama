import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./index.css";
import { login } from "./redux/userSlice";
import NavbarComp from "./components/NavbarComp";
import "./App.css";
import { AdminPage } from "./pages/AdminPage";
import { VerificationPage } from "./pages/verificationPage";
import DetailPage from "./pages/DetailPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { syncData } from "./redux/cartSlice";
import { loanData } from "./redux/loanSlice";
import CartPage from "./pages/CartPage";
import LoanPage from "./pages/LoanPage";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { NIM } = useSelector((state) => state.userSlice.value);

  const keepLogin = async () => {
    try {
      const res = await Axios.get(`http://localhost:2000/user/keepLogin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await Axios.get(`http://localhost:2000/cart/${res.data.NIM}`);
      dispatch(syncData(result.data))

      const loan = await Axios.get(`http://localhost:2000/loan/${res.data.NIM}`);
      dispatch(loanData(loan.data))

      dispatch(
        login({
          NIM: res.data.NIM,
          username: res.data.username,
          email: res.data.email,
          isVerified: res.data.isVerified,
          cart: result.data.length,
          loan: loan.data.length
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
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(
        login({
          username: res.data.username,
          isVerified: res.data.isVerified,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    NIM === 0 ? keepLogin() : keepLoginAdmin();
  });

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <NavbarComp />
              <HomePage />
            </>
          }
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/cart" element={<><NavbarComp/><CartPage /></>} />
        <Route path="/loan" element={<><NavbarComp/><LoanPage /></>} />
        <Route path="/verification/:token" element={<VerificationPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
