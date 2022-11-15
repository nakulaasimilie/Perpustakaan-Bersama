import React from "react";
import HomeComp from "../components/HomeComp";
import HomeMiniBanner from "../components/minibannerComp";
import Footer from "../components/footerComp";

export default function HomePage() {
  return (
    <>
      <HomeComp />
      <HomeMiniBanner/>
      <Footer/>
    </>
  );
};
