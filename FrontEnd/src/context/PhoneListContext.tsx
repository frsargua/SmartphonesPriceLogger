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
    filter: (brand: string, price: number | string) => [],
  });

export const CollectionOfPhonesProvider = ({ children }: ChildrenProps) => {
  const [phones, setPhones] = useState<PhonesProps[]>([]);
  const [phonesFilter, setPhonesFilter] = useState<PhonesProps[]>([]);

  async function fetchPhones() {
    let data = await fetchData(getAllPhones());
    setPhones(data);
    setPhonesFilter(data);
  }

  function getSinglePhone(id: Number) {
    if (phones.length > 0) {
      return phones.filter((el) => el.id === id);
    }
  }

  const filter = (brand: string, price: number | string) => {
    if (brand == "clear" && price != "clear") {
      console.log("one");
      let filter = phonesFilter.filter((el) => el.release_price < price);
      setPhones(filter);
    } else if (brand != "clear" && price == "clear") {
      console.log("two");
      let filter = phonesFilter.filter(
        (el) => el.brand_name.toLowerCase() == brand.toLocaleLowerCase()
      );
      console.log(filter);
      setPhones(filter);
    } else if (brand != "clear" && price != "clear") {
      console.log("three");
      console.log(brand, price);
      console.log(phones, phonesFilter);
      let filter = phonesFilter.filter(
        (el) =>
          el.release_price < price &&
          el.brand_name.toLowerCase() == brand.toLocaleLowerCase()
      );
      setPhones(filter);
    } else {
      setPhones(phonesFilter);
    }
  };

  useEffect(() => {
    fetchPhones();
    return;
  }, []);

  let value = {
    phones: phones,
    fetchPhones: fetchPhones,
    getSinglePhone: getSinglePhone,
    filter: filter,
  };
  return (
    <CollectionOfPhonesContext.Provider value={value}>
      {children}
    </CollectionOfPhonesContext.Provider>
  );
};
