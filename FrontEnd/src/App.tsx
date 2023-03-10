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
import { Compare } from "./Pages/Compare";

function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create-brand" element={<CreateBrand />} />
          <Route path="/update-phone/:id" element={<UpdatePhone />} />
          <Route
            path="/update-price/:model/:phoneId/:id"
            element={<UpdatePrice />}
          />
          <Route path="/news/:topic" element={<News />} />
          <Route path="/prices/:model/:id" element={<Prices />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
