import { createContext, useEffect, useState } from "react";
import {
  BrandsProps,
  PricesXYProps,
  ChildrenProps,
  CompareContextProps,
  CompareStateProps,
  PricesComparisonProps,
} from "../types";
import { fetchData } from "../utils/index";
import { getAllPricesById } from "../utils/URIs";
import { localStorageMethods } from "../utils/local-storage";

export const CompareContext = createContext<CompareContextProps>({
  arrayOfPhonePrices: [],
  fetchPrices: () => {},
  updateList: () => {},
});

export const CompareProvider = ({ children }: ChildrenProps) => {
  const [arrayOfPhonePrices, setArrayOfPhonePrices] = useState<
    CompareStateProps[]
  >([]);

  function convertToXY(
    arr: PricesComparisonProps[]
  ): { x: Number; y: Number }[] {
    return arr.map(
      (
        arrData: PricesComparisonProps,
        i: Number,
        arr: PricesComparisonProps[]
      ) => {
        let date_1 = new Date(arrData.date_added);
        let date_2 = new Date(arr[0].date_added);
        let difference = date_1.getTime() - date_2.getTime();
        return {
          x: Math.ceil(difference / (1000 * 3600 * 24)),
          y: Math.floor((arrData.price / arr[0].price) * 100),
        };
      }
    );
  }

  async function fetchPrices(id: string) {
    let data = await fetchData(getAllPricesById(id));

    setArrayOfPhonePrices((prev) => {
      let verifier = prev.some((el) => el.model == id);
      if (!verifier) {
        return [
          ...prev,
          {
            model: id,
            prices: [...convertToXY(data)],
          },
        ];
      } else {
        return [...prev];
      }
    });

    localStorageMethods.updateLS("arrayOfPhonePrices", arrayOfPhonePrices);
  }

  async function updateList(modelId: string) {
    let data = await fetchData(getAllPricesById(modelId));
    setArrayOfPhonePrices((prev) => {
      return prev.map((el) => {
        if (el.model == modelId) {
          el.prices = [...convertToXY(data)];
        }
        return el;
      });
    });

    localStorageMethods.updateLS("arrayOfPhonePrices", arrayOfPhonePrices);
  }

  useEffect(() => {
    localStorageMethods.initializeLS("arrayOfPhonePrices");
    let listFromLS = localStorageMethods.loadFromLS("arrayOfPhonePrices");
    setArrayOfPhonePrices(listFromLS);
  }, []);

  let value = {
    arrayOfPhonePrices,
    fetchPrices: fetchPrices,
    updateList: updateList,
  };
  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
};
