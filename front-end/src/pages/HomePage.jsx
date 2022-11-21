import React from "react";
import HomeComp from "../components/HomeComp";
import HomeMiniBanner from "../components/minibannerComp";
import Footer from "../components/footerComp";
import BookCard from "../components/AllBookComp";

export default function HomePage() {
  return (
    <>
      <HomeComp />
      <HomeMiniBanner />
      <BookCard />
      <Footer />
    </>
  );
}
