import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CreateBrand } from "./Pages/CreateBrand";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" />
        <Route path="/create-brand" element={<CreateBrand />} />
        <Route path="/" />
        <Route path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
