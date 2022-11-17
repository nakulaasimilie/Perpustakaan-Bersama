import  HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "./index.css";
import { login } from "./redux/userSlice";
import NavbarComp from "./components/NavbarComp";
import { VerificationPage } from "./pages/verificationPage"
import DetailPage from "./pages/DetailPage";
import './App.css';

function App() {

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const keepLogin = async () => {
    try {

      const res = await Axios.get(`http://localhost:2000/user/keepLogin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(login({
        NIM: res.data.NIM,
        username: res.data.username,
        email: res.data.email,
        isVerified: res.data.isVerified
      }));
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    keepLogin()
  })


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
          <Route path="/verification/:token" element={<VerificationPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
