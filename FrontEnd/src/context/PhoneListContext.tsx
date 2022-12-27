import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  PhonesProps,
  ChildrenProps,
  PhonesCollectionContextProps,
  SortingConfiguration,
  SortingType,
  TableData,
} from "../types";

import Enumerable from "linq";
import { fetchData } from "../utils/index";
import { getAllPhones } from "../utils/URIs";
import { stringify } from "querystring";

export const CollectionOfPhonesContext =
  createContext<PhonesCollectionContextProps>({
    phones: [],
    fetchPhones: () => {},
    sortBy: (propertyName: keyof TableData) => {},
    filter: (brand: string, price: number | string) => {},
    getSortDirection: () => <div></div>,
  });

export const CollectionOfPhonesProvider = ({ children }: ChildrenProps) => {
  const [phones, setPhones] = useState<PhonesProps[]>([]);
  const [phonesFilter, setPhonesFilter] = useState<PhonesProps[]>([]);
  const [sortConfig, updateSortConfig] = useState<SortingConfiguration[]>([]);

  async function fetchPhones() {
    let data = await fetchData(getAllPhones());
    setPhones(data);
    setPhonesFilter(data);
  }

  useEffect(() => {
    fetchPhones();
    return;
  }, []);

  const filter = (brand: string, price: number | string) => {
    if (brand == "clear" && price != "clear") {
      let filter = phonesFilter.filter((el) => el.release_price < price);
      setPhones(filter);
    } else if (brand != "clear" && price == "clear") {
      let filter = phonesFilter.filter(
        (el) => el.brand_name.toLowerCase() == brand.toLocaleLowerCase()
      );
      setPhones(filter);
    } else if (brand != "clear" && price != "clear") {
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
    setPhones(sorted.toArray());
  }, [sortConfig]);

  let value = {
    phones: phones,
    fetchPhones: fetchPhones,
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
