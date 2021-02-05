import { useEffect, useReducer } from "react";

const initialState = {
    loading: "",
    error: "",
    data: []
};

const DISPLAY_PRODUCT_SUCCESS = "Display Product Success"
const DISPLAY_PRODUCT_FAILURE = "Display Product Failure"
const ERROR_MESSAGE = "Server error"

const productReducer = (state, action) => {
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
    default:
      return state;
  }
};

export function useGetProducts() {
    const [data, dispatch] = useReducer(productReducer, initialState);
  
    useEffect(() => {
      fetch("https://api.mocki.io/v1/a135f562")
        .then(response => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then(json => {
          dispatch({ type: DISPLAY_PRODUCT_SUCCESS, payload: json });
        })
        .catch(error => {
          dispatch({ type: DISPLAY_PRODUCT_FAILURE, error : ERROR_MESSAGE})
        });
    }, []);
    
    return data.data;
}