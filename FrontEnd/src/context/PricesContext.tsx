import React, { createContext, useEffect, useState } from "react";
import { PricesContextProps, ChildrenProps, PricesProps } from "../types";
import { fetchData } from "../utils/index";

import { getAllPrices } from "../utils/URIs";

export const PricesContext = createContext<PricesContextProps>({
  prices: [],
  fetchPrices: () => {},
});

export const PricesProvider = ({ children }: ChildrenProps) => {
  const [prices, setPrices] = useState<PricesProps[]>([]);

  async function fetchPrices() {
    let data = await fetchData(getAllPrices());
    setPrices(data);
  }

  useEffect(() => {
    fetchPrices();
    return;
  }, []);

  let value = {
    prices: prices,
    fetchPrices: fetchPrices,
  };
  return (
    <PricesContext.Provider value={value}>{children}</PricesContext.Provider>
  );
};
