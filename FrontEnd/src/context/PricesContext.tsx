import React, { createContext, useEffect, useState } from "react";
import { PricesContextProps, ChildrenProps, PricesProps } from "../types";
import { fetchData } from "../utils/index";

import { getAllPricesById } from "../utils/URIs";

export const PricesContext = createContext<PricesContextProps>({
  prices: [],

  fetchPrices: () => {},
});

export const PricesProvider = ({ children }: ChildrenProps) => {
  const [prices, setPrices] = useState<PricesProps[]>([]);

  async function fetchPrices(id: string) {
    let data = await fetchData(getAllPricesById(id));
    setPrices(data);
  }

  let value = {
    prices: prices,
    fetchPrices: fetchPrices,
  };
  return (
    <PricesContext.Provider value={value}>{children}</PricesContext.Provider>
  );
};
