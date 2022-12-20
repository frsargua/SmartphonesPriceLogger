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
    getSinglePhone: (id: Number) => {},
  });

export const CollectionOfPhonesProvider = ({ children }: ChildrenProps) => {
  const [phones, setPhones] = useState<PhonesProps[]>([]);

  async function fetchPhones() {
    let data = await fetchData(getAllPhones());
    setPhones(data);
  }

  function getSinglePhone(id: Number) {
    if (phones.length > 0) {
      return phones.filter((el) => el.id === id);
    }
  }

  useEffect(() => {
    fetchPhones();
    return;
  }, []);

  let value = {
    phones: phones,
    fetchPhones: fetchPhones,
    getSinglePhone: getSinglePhone,
  };
  return (
    <CollectionOfPhonesContext.Provider value={value}>
      {children}
    </CollectionOfPhonesContext.Provider>
  );
};
