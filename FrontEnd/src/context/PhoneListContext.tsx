import React, { createContext, useEffect, useState } from "react";
import {
  PhonesProps,
  ChildrenProps,
  PhonesCollectionContextProps,
} from "../types";

import { fetchData } from "../utils/index";
import { getAllPhones } from "../utils/URIs";

export const CollectionOfPhonesContext =
  createContext<PhonesCollectionContextProps>({
    phones: [],
    fetchPhones: () => {},
  });

export const CollectionOfPhonesProvider = ({ children }: ChildrenProps) => {
  const [phones, setPhones] = useState<PhonesProps[]>([]);

  async function fetchPhones() {
    let data = await fetchData(getAllPhones());
    console.log(data);
    setPhones(data);
  }
  useEffect(() => {
    fetchPhones();
    return;
  }, []);

  let value = {
    phones: phones,
    fetchPhones: fetchPhones,
  };
  return (
    <CollectionOfPhonesContext.Provider value={value}>
      {children}
    </CollectionOfPhonesContext.Provider>
  );
};
