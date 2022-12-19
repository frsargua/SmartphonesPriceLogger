export type PhoneProps = {
  brand_id?: number;
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
};

export type ChildrenProps = {
  children?: React.ReactNode;
};
