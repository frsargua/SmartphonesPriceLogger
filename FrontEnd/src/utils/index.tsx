import { BrandsProps } from "../types";

export async function fetchData(apiUrl: string) {
  const data = await fetch(apiUrl);
  return data.json();
}
