import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Enumerable from "linq";
import {
  PhonesProps,
  ChildrenProps,
  PhonesCollectionContextProps,
  SortingConfiguration,
  SortingType,
  TableData,
  TableColumn,
} from "../types";

import { fetchData } from "../utils/index";
import { getAllPhones } from "../utils/URIs";

export const CollectionOfPhonesContext =
  createContext<PhonesCollectionContextProps>({
    phones: [],
    fetchPhones: () => {},
    sortBy: (propertyName: keyof TableData) => {},
    getSinglePhone: (id: Number) => {},
    filter: (brand: string, price: number | string) => {},
    getSortDirection: () => <div></div>,
  });

export const CollectionOfPhonesProvider = ({ children }: ChildrenProps) => {
  const [phones, setPhones] = useState<PhonesProps[]>([]);
  const [sortConfig, updateSortConfig] = useState<SortingConfiguration[]>([]);
  const [phonesFilter, setPhonesFilter] = useState<PhonesProps[]>([]);
  const [sortState, setSortState] = useState<PhonesProps[]>([]);

  async function fetchPhones() {
    let data = await fetchData(getAllPhones());
    setPhones(data);
    setPhonesFilter(data);
    setSortState(data);
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

  const sortBy = useCallback(
    (propertyName: keyof TableData) => {
      let pendingChange = [...sortConfig];
      const index = pendingChange.findIndex(
        (config) => config.propertyName === propertyName
      );
      if (index > -1) {
        //Save the sortType
        var currentSortType = pendingChange[index].sortType;
        //Remove existing config
        pendingChange.splice(index, 1);
        //check if the sort type we saved is descending
        if (currentSortType === SortingType.Descending) {
          pendingChange = [
            ...pendingChange,
            { propertyName: propertyName, sortType: SortingType.Ascending },
          ];
        }
      } else {
        pendingChange = [
          ...pendingChange,
          { propertyName: propertyName, sortType: SortingType.Descending },
        ];
      }
      updateSortConfig([...pendingChange]);
    },
    [sortConfig]
  );

  const getSortDirection = (property: keyof TableData) => {
    var config = sortConfig.find(
      (sortConfig) => sortConfig.propertyName === property
    );
    if (config) {
      if (config.sortType === SortingType.Descending) {
        return <ArrowDownward />;
      } else {
        return <ArrowUpward />;
      }
    }
    return null;
  };

  const sortedRows = useMemo(() => {
    //Loop through the queue
    let sorted = Enumerable.from(phones).orderBy(() => 1);
    sortConfig.forEach((sortConfig) => {
      if (sortConfig.sortType === SortingType.Ascending) {
        sorted = sorted
          .thenBy((dataRow) =>
            dataRow[sortConfig.propertyName] === null ? -1 : 1
          )
          .thenBy((dataRow) => dataRow[sortConfig.propertyName]);
      } else {
        sorted = sorted
          .thenByDescending((dataRow) =>
            dataRow[sortConfig.propertyName] === null ? -1 : 1
          )
          .thenByDescending((dataRow) => dataRow[sortConfig.propertyName]);
      }
    });
    return sorted.toArray();
  }, [sortConfig, sortState]);

  useEffect(() => {
    let newSorted = sortedRows;
    setPhones(newSorted);
  }, [sortConfig, sortState]);

  useEffect(() => {
    fetchPhones();
    return;
  }, []);

  let value = {
    phones: phones,
    fetchPhones: fetchPhones,
    getSinglePhone: getSinglePhone,
    filter: filter,
    sortBy: sortBy,
    getSortDirection: getSortDirection,
  };
  return (
    <CollectionOfPhonesContext.Provider value={value}>
      {children}
    </CollectionOfPhonesContext.Provider>
  );
};
