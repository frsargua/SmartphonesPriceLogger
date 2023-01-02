import dayjs, { Dayjs } from "dayjs";
// Types mainly use for the brands useContext

export type BrandProps = {
  brand: string;
};

export type BrandsProps = { brand: string };

export type BrandsContextProps = {
  brands: BrandProps[];
  fetchBrands: () => void;
};

// Types mainly use for the comparison useContext
export type PricesComparisonProps = {
  model: Number;
  id: Number;
  date_added: Date;
  price: number;
  created_at: Date;
  updated_at: Date;
};
export type PricesXYProps = { x: Number; y: Number };

export type CompareStateProps = {
  model: string;
  prices: PricesXYProps[];
};

export type CompareContextProps = {
  arrayOfPhonePrices: CompareStateProps[];
  listOfIds: Number[];
  fetchPrices: (modelId: string) => void;
  updateList: (modelId: string) => void;
  removeFromList: (modelId: string) => void;
};

// Types mainly use for the prices useContext

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
};

// Types mainly use for the phones useContext
export type PhoneProps = {
  brand_name?: number;
  model?: string;
  price?: number;
  id?: number;
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

  filter: (brand: string, price: number | string) => void;
  sortBy: (propertyName: keyof TableData) => void;
  getSortDirection: (
    property: keyof TableData
  ) => React.ReactElement<any> | null;
};

export type ChildrenProps = {
  children?: React.ReactNode;
};

// For the url parameters
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
  brand_name: String;
  release_price: string;
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
  property: keyof TableData;
};

//form props

export type newPhoneProps = {
  brand_name: string;
  release_date: Dayjs | string;
  model: string;
  release_price: Number | null;
};

export type updatePhoneProps = {
  brand_name: string;
  model: string;
  release_price: Number;
};

export type ArticleType = {
  topic?: string;
  author?: string;
  publishedAt?: Date;
  source?: { Id: string; Name: string };
  title?: string;
  url?: string;
};
