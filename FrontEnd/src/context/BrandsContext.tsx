import React, { createContext, useEffect, useState } from "react";
import { BrandsProps, ChildrenProps, BrandsContextProps } from "../types";

import { fetchData } from "../utils/index";
import { getBrands } from "../utils/URIs";

export const BrandsContext = createContext<BrandsContextProps>({
  brands: [],
});

export const BrandsProvider = ({ children }: ChildrenProps) => {
  const [brands, setBrands] = useState<BrandsProps[]>([]);

  useEffect(() => {
    async function fetchBrands() {
      let data = await fetchData(getBrands());
      console.log(data);
      setBrands(data);
    }

    fetchBrands();
    return;
  }, []);

  let value = {
    brands: brands,
  };
  return (
    <BrandsContext.Provider value={value}>{children}</BrandsContext.Provider>
  );
};
