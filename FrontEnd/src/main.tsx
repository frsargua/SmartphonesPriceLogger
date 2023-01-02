import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrandsProvider } from "./context/BrandsContext";
import { CollectionOfPhonesProvider } from "./context/PhoneListContext";
import { PricesProvider } from "./context/PricesContext";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CompareProvider } from "./context/CompareContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <BrandsProvider>
        <CompareProvider>
          <PricesProvider>
            <CollectionOfPhonesProvider>
              <App />
            </CollectionOfPhonesProvider>
          </PricesProvider>
        </CompareProvider>
      </BrandsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
