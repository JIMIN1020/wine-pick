import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AppRouter;
