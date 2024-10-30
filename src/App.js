import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import News from "./pages/News";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<News />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
