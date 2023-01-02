import { createContext, useEffect, useState } from "react";
import {
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
  listOfIds: [],
  fetchPrices: () => {},
  updateList: () => {},
  removeFromList: () => {},
});

export const CompareProvider = ({ children }: ChildrenProps) => {
  const [arrayOfPhonePrices, setArrayOfPhonePrices] = useState<
    CompareStateProps[]
  >([]);
  const [listOfIds, setListOfIds] = useState<Number[]>([]);

  function convertToXY(arr: PricesComparisonProps[]): PricesXYProps[] {
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

    setListOfIds((prev) => {
      return [...prev, parseInt(id)];
    });
    localStorageMethods.updateLS("arrayOfPhonePrices", arrayOfPhonePrices);
    localStorageMethods.updateLS("listOfIds", listOfIds);
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
    localStorageMethods.updateLS("listOfIds", listOfIds);
  }

  async function removeFromList(modelId: string) {
    setArrayOfPhonePrices((prev) => {
      return prev.filter((el) => el.model !== modelId);
    });
    setListOfIds((prev) => {
      return prev.filter((el) => el !== +modelId);
    });

    localStorageMethods.updateLS("arrayOfPhonePrices", arrayOfPhonePrices);
    localStorageMethods.updateLS("listOfIds", listOfIds);
  }

  useEffect(() => {
    localStorageMethods.initializeLS("arrayOfPhonePrices");
    let listFromLS = localStorageMethods.loadFromLS("arrayOfPhonePrices");
    let listOfIdsFromLS = localStorageMethods.loadFromLS("listOfIds");
    setArrayOfPhonePrices(listFromLS);
    setListOfIds(listOfIdsFromLS);
  }, []);

  let value = {
    arrayOfPhonePrices,
    listOfIds,
    fetchPrices: fetchPrices,
    updateList: updateList,
    removeFromList: removeFromList,
  };
  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
};
