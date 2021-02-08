import { useState } from "react";

const adIndexList = new Array();

export function generateAd() {
  let isDone = false;
  let index;

  while (!isDone) {
      index = Math.floor(Math.random()*1000);
      if (!adIndexList.includes(index)) {
          isDone = true;
      }
  }

  adIndexList.push(index)

  return AD_IMAGE_URL + index;
}

export const LIMIT = 20

export const BASE_URL = "http://localhost:3000/"
export const ENDPOINT_DISPLAY_PRODUCT = BASE_URL + "api/products?_limit=" + LIMIT + "&page="
export const ENDPOINT_SORT_PRODUCT = BASE_URL + "api/products?_sort="
export const AD_IMAGE_URL = BASE_URL + "ads/?r="