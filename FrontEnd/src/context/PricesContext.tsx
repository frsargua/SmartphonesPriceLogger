import React, { createContext, useEffect, useState } from "react";
import { PricesContextProps, ChildrenProps, PricesProps } from "../types";
import { fetchData } from "../utils/index";

import { getAllPricesById } from "../utils/URIs";

export const PricesContext = createContext<PricesContextProps>({
  prices: [],
  tempId: "",
  fetchPrices: () => {},
  changeTempId: () => {},
});

export const PricesProvider = ({ children }: ChildrenProps) => {
  const [prices, setPrices] = useState<PricesProps[]>([]);
  const [tempId, setTempId] = useState<string>("");

  async function fetchPrices(id: string) {
    let data = await fetchData(getAllPricesById(id));
    setPrices(data);
  }

  async function changeTempId(id: string) {
    let data = await fetchData(getAllPricesById(id));
    let newData = prices.filter((el) => el.id != id);
    console.log(data);
    setPrices(newData);
  }

  let value = {
    prices: prices,
    fetchPrices: fetchPrices,
    tempId: tempId,
    changeTempId: changeTempId,
  };
  return (
    <PricesContext.Provider value={value}>{children}</PricesContext.Provider>
  );
};
