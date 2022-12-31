export class localStorageMethods {
  static initializeLS(location: string) {
    const arrFromLS = localStorage.getItem(location);
    if (!arrFromLS) {
      localStorage.setItem(location, JSON.stringify([]));
    }
  }

  static updateLS = (location: string, object: any[]) => {
    const arrFromLS = localStorage.getItem(location);
    let arrayFromLS = arrFromLS !== null ? JSON.parse(arrFromLS) : [];
    localStorage.setItem(location, JSON.stringify(object));
  };

  static loadFromLS = (location: string) => {
    const arrFromLS = localStorage.getItem(location);
    let arrayFromLS = arrFromLS !== null ? JSON.parse(arrFromLS) : [];
    return arrayFromLS;
  };
}
