import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import News from "./pages/News";
import NoPageFound from "./components/NoPageFound";
import Personalized from "./pages/Personalized";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/personalized" element={<Personalized />} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
