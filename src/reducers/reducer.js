import { useEffect, useReducer } from "react";

const initialState = {
    loading: "",
    error: "",
    data: []
};

const DISPLAY_PRODUCT = "DISPLAY_PRODUCT"

const productReducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_PRODUCT:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

export function useGetProducts() {
    const [data, dispatch] = useReducer(productReducer, initialState);
  
    useEffect(() => {
      // dispatch(displayProductSuccess());
  
      fetch("https://api.mocki.io/v1/a135f562")
        .then(response => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then(json => {
          dispatch({ type: DISPLAY_PRODUCT, payload: json });
        })
        .catch(error => {
          // dispatch(displayProductFailure({ payload: error.message }));
        });
    }, []);
    
    return data.data;
}