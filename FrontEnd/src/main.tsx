import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrandsProvider } from "./context/BrandsContext";
import { CollectionOfPhonesProvider } from "./context/PhoneListContext";
import { PricesProvider } from "./context/PricesContext";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <BrandsProvider>
        <PricesProvider>
          <CollectionOfPhonesProvider>
            <App />
          </CollectionOfPhonesProvider>
        </PricesProvider>
      </BrandsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
