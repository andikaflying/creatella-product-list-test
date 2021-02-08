import { useState } from "react";

export function generateAdIndex(adIndexList) {
    let isDone = false;
    let index;
    while (!isDone) {
        index = Math.floor(Math.random()*1000);
        if (!adIndexList.includes(index)) {
            isDone = true;
        }
    }

    return index;
}

const LIMIT = 15

export const BASE_URL = "http://localhost:3000/"
export const ENDPOINT_DISPLAY_PRODUCT = BASE_URL + "api/products?_limit=" + LIMIT + "&page="
export const ENDPOINT_SORT_PRODUCT = BASE_URL + "api/products?_sort="
export const ENDPOINT_DISPLAY_AD = BASE_URL + ""
export const AD_IMAGE_URL = BASE_URL + "ads/?r="

// export const ENDPOINT_DISPLAY_PRODUCT = "https://api.mocki.io/v1/a135f562"
// export const ENDPOINT_SORT_PRODUCT = "https://api.mocki.io/v1/a135f562"
// export const ENDPOINT_DISPLAY_AD = "https://api.mocki.io/v1/a135f562"

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });
  
    const setValue = value => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    };
  
    return [storedValue, setValue];
}