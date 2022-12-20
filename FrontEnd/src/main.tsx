import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrandsProvider } from "./context/BrandsContext";
import { CollectionOfPhonesProvider } from "./context/PhoneListContext";
import { PricesProvider } from "./context/PricesContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrandsProvider>
      <PricesProvider>
        <CollectionOfPhonesProvider>
          <App />
        </CollectionOfPhonesProvider>
      </PricesProvider>
    </BrandsProvider>
  </React.StrictMode>
);
