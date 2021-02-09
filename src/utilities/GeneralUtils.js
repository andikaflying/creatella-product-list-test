import { useState } from "react";

const adIndexList = new Array();

export function generateAd(indexProduct) {
  let isDone = false;
  let index;
  let indexAd = (indexProduct / 20) - 1;

  if (adIndexList[indexAd] == null) {
    while (!isDone) {
      index = Math.floor(Math.random()*1000);
      if (!adIndexList.includes(index)) {
          isDone = true;
      }
    }

    adIndexList.push(index)
  } else {
    index = adIndexList[indexAd]
  }

  return AD_IMAGE_URL + index;
}

export const LIMIT = 20
export const LIMIT_PRODUCT_BEFORE_AD = 20
export const TOTAL_ALL_PRODUCTS = 500

export const BASE_URL = "http://localhost:3000/"
export const ENDPOINT_DISPLAY_PRODUCT = BASE_URL + "api/products?_limit=" + LIMIT + "&_page="
export const ENDPOINT_SORT_PRODUCT = BASE_URL + "api/products?_sort="
export const AD_IMAGE_URL = BASE_URL + "ads/?r="