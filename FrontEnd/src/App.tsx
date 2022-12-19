import { Container } from "@mui/system";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CreateBrand } from "./Pages/CreateBrand";
import { Main } from "./Pages/Main";
import { Prices } from "./Pages/Prices";
import { UpdatePhone } from "./Pages/UpdatePhone/Index";
import { UpdatePrice } from "./Pages/UpdatePrice/Index";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create-brand" element={<CreateBrand />} />
          <Route path="/update-phone/:id" element={<UpdatePhone />} />
          <Route path="/update-price/:id" element={<UpdatePrice />} />
          <Route path="/prices/:id" element={<Prices />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
