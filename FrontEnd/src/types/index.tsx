export type PhoneProps = {
  brand_name?: number;
  brand?: string;
  model: string;
  price: number;
  id: number;
};

export type PriceProps = {
  date: Date;
  price: number;
  newPrice: number;
};

export type BrandProps = {
  brand: string;
};

export type BrandsProps = { brand: string };

export type BrandsContextProps = {
  brands: BrandProps[];
  fetchBrands: () => void;
};

export type PhonesProps = {
  id: Number;
  brand_name: Number;
  model: string;
  release_date: Date;
  release_price: Number;
};

export type PhonesCollectionContextProps = {
  phones: PhonesProps[];
  fetchPhones: () => void;
  getSinglePhone: (id: Number) => void;
};

export type ChildrenProps = {
  children?: React.ReactNode;
};

export type MyParams = {
  id: string;
};
