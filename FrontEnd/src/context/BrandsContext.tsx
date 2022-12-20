import React, { createContext, useEffect, useState } from "react";
import { BrandsProps, ChildrenProps, BrandsContextProps } from "../types";

import { fetchData } from "../utils/index";
import { getBrands } from "../utils/URIs";

export const BrandsContext = createContext<BrandsContextProps>({
  brands: [],
  fetchBrands: () => {},
});

export const BrandsProvider = ({ children }: ChildrenProps) => {
  const [brands, setBrands] = useState<BrandsProps[]>([]);

  async function fetchBrands() {
    let data = await fetchData(getBrands());
    setBrands(data);
  }

  useEffect(() => {
    fetchBrands();
    return;
  }, []);

  let value = {
    brands: brands,
    fetchBrands: fetchBrands,
  };
  return (
    <BrandsContext.Provider value={value}>{children}</BrandsContext.Provider>
  );
};
