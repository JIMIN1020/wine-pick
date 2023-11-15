import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Pairing from "./routes/Pairing";
import Recommend from "./routes/Recommend";
import Sommelier from "./routes/Sommelier";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/pairing" element={<Pairing />} />
      <Route path="/recommend" element={<Recommend />} />
      <Route path="/sommelier" element={<Sommelier />} />
    </Routes>
  );
};

export default AppRouter;
