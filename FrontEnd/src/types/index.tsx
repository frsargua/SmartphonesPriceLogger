export type PhoneProps = {
  brand_name?: number;
  model?: string;
  price?: number;
  id?: number;
};

// export type PriceProps = {
//   model_id: Number;
//   id: Number;
//   date_added: Date;
//   price: number;
//   created_at: Date;
//   updated_at: Date;
// };

export type BrandProps = {
  brand: string;
};

export type BrandsProps = { brand: string };

export type BrandsContextProps = {
  brands: BrandProps[];
  fetchBrands: () => void;
};

export type PricesProps = {
  model_id: Number;
  id: Number;
  date_added: Date;
  price: number;
  created_at: Date;
  updated_at: Date;
};

export type PricesContextProps = {
  prices: PricesProps[];
  fetchPrices: (id: string) => void;
  changeTempId: (id: Number) => void;
  tempId: string;
};

export type PhonesProps = {
  id: Number;
  brand_name: string;
  model: string;
  release_date: Date;
  release_price: Number;
};

export type PhonesCollectionContextProps = {
  phones: PhonesProps[];
  fetchPhones: () => void;
  getSinglePhone: (id: Number) => void;
  filter: (brand: string, price: number | string) => void;
  sortBy: (propertyName: keyof TableData) => void;
  getSortDirection: (
    property: keyof TableData
  ) => React.ReactElement<any> | null;
};

export type ChildrenProps = {
  children?: React.ReactNode;
};

export type TopicParams = {
  topic: string;
};
export type MyParams = {
  id?: string;
  topic?: string;
  phoneId?: string;
  model?: string;
};

// Sorting

export interface TableData {
  brand_name?: string;
  model?: string;
  release_price?: Number;
  id?: Number;
}
export interface SortingConfiguration {
  propertyName: keyof TableData;
  sortType: SortingType;
}

export enum SortingType {
  Ascending,
  Descending,
}

export type TableColumn = {
  label: string;
  property: string;
};
