import { useEffect, useReducer } from "react";

export const initialState = {
    loading: "",
    error: "",
    data: []
};

export const DISPLAY_PRODUCT_SUCCESS = "Display Product Success"
export const DISPLAY_PRODUCT_FAILURE = "Display Product Failure"
export const SORT_PRODUCT_SUCCESS = "Sort Product Success"
export const SORT_PRODUCT_FAILURE = "Sort Product Failure"
export const DISPLAY_PRODUCT_OTHER_PAGE_SUCCESS = "Display Product Some Page Success"
export const DISPLAY_PRODUCT_OTHER_PAGE_FAILURE = "Display Product Some Page Failure"
export const ERROR_MESSAGE = "Server error"

export const productReducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_PRODUCT_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case DISPLAY_PRODUCT_FAILURE: 
      return {
        ...state,
        error: action.error
      };
    case SORT_PRODUCT_SUCCESS:
        return {
          ...state,
          data: action.payload
        };
    case SORT_PRODUCT_FAILURE: 
        return {
          ...state,
          error: action.error
        };  
    case DISPLAY_PRODUCT_OTHER_PAGE_SUCCESS:
        return {
          ...state,
          data: state.data.concat(action.payload)
        };
    case DISPLAY_PRODUCT_OTHER_PAGE_FAILURE: 
        return {
          ...state,
          error: action.error
        };  
    default:
      return state;
  }
};