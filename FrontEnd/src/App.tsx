import { Container } from "@mui/system";
import { News } from "./Pages/News";
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
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create-brand" element={<CreateBrand />} />
          <Route path="/update-phone/:id" element={<UpdatePhone />} />
          <Route path="/update-price/:model/:id" element={<UpdatePrice />} />
          <Route path="/news/:topic" element={<News />} />
          <Route path="/prices/:model/:id" element={<Prices />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
