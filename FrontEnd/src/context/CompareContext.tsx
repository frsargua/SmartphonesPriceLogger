import { createContext, useEffect, useState } from "react";
import {
  BrandsProps,
  ChildrenProps,
  CompareContextProps,
  CompareStateProps,
} from "../types";
import { fetchData } from "../utils/index";
import { getAllPricesById } from "../utils/URIs";
import { localStorageMethods } from "../utils/local-storage";

export const CompareContext = createContext<CompareContextProps>({
  arrayOfPhonePrices: [],
  fetchPrices: () => {},
});

export const CompareProvider = ({ children }: ChildrenProps) => {
  const [arrayOfPhonePrices, setArrayOfPhonePrices] = useState<PricesProps[]>(
    []
  );
  const [listOfIds, setListOfIds] = useState<number[]>([]);

  async function fetchPrices(id: string) {
    let data = await fetchData(getAllPricesById(id));

    setArrayOfPhonePrices((prev) => {
      let verifier = prev.some((el) => el.id == id);
      if (!verifier) {
        return [
          ...prev,
          {
            model: id,
            prices: [
              ...data.map((el, i, arr) => {
                let date_1 = new Date(el.date_added);
                let date_2 = new Date(arr[0].date_added);
                let difference = date_1.getTime() - date_2.getTime();
                return {
                  x: Math.ceil(difference / (1000 * 3600 * 24)),
                  y: Math.floor((el.price / arr[0].price) * 100),
                };
              }),
            ],
          },
        ];
      } else {
        return [...prev];
      }
    });

    localStorageMethods.updateLS("arrayOfPhonePrices", arrayOfPhonePrices);

    setListOfIds((prev) => {
      if (prev.includes(+id)) {
        return [...prev];
      } else {
        return [...prev, +id];
      }
    });
  }

  async function updateList(modelId: string) {
    let data = await fetchData(getAllPricesById(modelId));

    setArrayOfPhonePrices((prev) => {
      let verifier = prev.some((el) => el.id == modelId);
      if (verifier) {
        let updatedList: PricesProps[] = prev.map((el) => {
          if (el.id == modelId) {
            el.prices = [...data];
          }
          return updatedList;
        });
        return updatedList;
      } else {
        return [...prev];
      }
    });
  }

  useEffect(() => {
    localStorageMethods.initializeLS("arrayOfPhonePrices");
    let listFromLS = localStorageMethods.loadFromLS("arrayOfPhonePrices");
    setArrayOfPhonePrices(listFromLS);
    console.log(listFromLS);
  }, []);

  let value = {
    arrayOfPhonePrices,
    fetchPrices: fetchPrices,
  };
  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
};

Key	Value
filmGo-wishlist	[{"imgLink":"/tUBN1paMQ1tmVA5Sjy1ZjPWVsiF.jpg","title":"Tad the Lost Explorer and the Emerald Tablet","index":0,"id":676701}]
arrayOfPhonePrices	[{"model":4,"prices":[{"x":0,"y":100},{"x":4,"y":87}]},{"model":5,"prices":[{"x":0,"y":100},{"x":365,"y":75},{"x":731,"y":333}]},{"model":3,"prices":[{"x":0,"y":100},{"x":4,"y":66}]}]