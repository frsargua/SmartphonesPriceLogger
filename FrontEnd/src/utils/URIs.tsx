let base = "http://127.0.0.1:8000";

// Brands URIs
export function getBrands(): string {
  return `${base}/api/brand`;
}

export function createBrand(): string {
  return `${base}/api/brand`;
}

// Phones table URIs

export function getPhoneById(id: string): string {
  return `${base}/api/phone/${id}`;
}

export function getAllPhones(): string {
  return `${base}/api/phones`;
}

export function createPhone(): string {
  return `${base}/api/phones`;
}

export function updatePhoneById(phoneId: string): string {
  return `${base}/api/phones/${phoneId}`;
}

export function deletePhoneById(phoneId: string): string {
  return `${base}/api/phones/${phoneId}`;
}

// Prices table URIs

export function getAllPrices(): string {
  return `${base}/api/prices`;
}
export function getAllPricesById(id: string): string {
  return `${base}/api/prices/${id}`;
}

export function getAllPriceById(id: string): string {
  return `${base}/api/price/${id}`;
}

export function createPriceById(): string {
  return `${base}/api/price`;
}

export function deletePriceById(id: string): string {
  return `${base}/api/price/${id}`;
}

export function updatePriceById(id: string, phoneId: string): string {
  return `${base}/api/price/${phoneId}/${id}`;
}

// News

export function newsApi(topis: string): string {
  return `https://newsapi.org/v2/everything?q=${topis}&pageSize=20&sortBy=popularity&apiKey=cd0ed60d4c7141eca5ec4a1e8a198b47`;
}
