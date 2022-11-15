import  HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
// import Axios from "axios";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
import "./index.css";
// import { login } from "./redux/userSlice";
import NavbarComp from "./components/NavbarComp";

function App() {


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
      </Routes>
    </div>
  );
}

export default App;
