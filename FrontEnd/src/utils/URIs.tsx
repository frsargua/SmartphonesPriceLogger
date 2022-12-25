export function getBrands(): string {
  return "http://127.0.0.1:8000/api/brand";
}

export function getPhoneById(id: string): string {
  return `http://127.0.0.1:8000/api/phone/${id}`;
}

export function getAllPhones(): string {
  return "http://127.0.0.1:8000/api/phones";
}

export function getAllPrices(): string {
  return "http://127.0.0.1:8000/api/prices";
}
export function getAllPricesById(id: string): string {
  return `http://127.0.0.1:8000/api/prices/${id}`;
}

export function getAllPriceById(id: string): string {
  return `http://127.0.0.1:8000/api/price/${id}`;
}

export function createPhone(): string {
  return `http://127.0.0.1:8000/api/phones`;
}

export function createPriceById(): string {
  return `http://127.0.0.1:8000/api/price`;
}

export function deletePriceById(id: string): string {
  return `http://127.0.0.1:8000/api/price/${id}`;
}

export function updatePhoneById(phoneId: string): string {
  return `http://127.0.0.1:8000/api/phones/${phoneId}`;
}

export function updatePriceById(id: string, phoneId: string): string {
  return `http://127.0.0.1:8000/api/price/${phoneId}/${id}`;
}

export function createBrand(): string {
  return "http://127.0.0.1:8000/api/brand";
}
