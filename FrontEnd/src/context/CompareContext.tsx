import { createContext, useEffect, useState } from "react";
import { BrandsProps, ChildrenProps, CompareContextProps } from "../types";
import { fetchData } from "../utils/index";
import { getBrands } from "../utils/URIs";

export const CompareContext = createContext<CompareContextProps>({
  arrayOfPhonePrices: [],
  fetchPrices: () => {},
});

export const CompareProvider = ({ children }: ChildrenProps) => {
  const [arrayOfPhonePrices, setArrayOfPhonePrices] = useState<BrandsProps[]>(
    []
  );

  async function fetchPrices() {
    let data = await fetchData(getBrands());
    setArrayOfPhonePrices(data);
  }

  let value = {
    arrayOfPhonePrices,
    fetchPrices: fetchPrices,
  };
  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
};
