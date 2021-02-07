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
        state.data.push(...action.payload)
        return state;
    case DISPLAY_PRODUCT_OTHER_PAGE_FAILURE: 
        return {
          ...state,
          error: action.error
        };  
    default:
      return state;
  }
};

// export function useGetProducts() {
//     fetch("https://api.mocki.io/v1/a135f562")
//       .then(response => {
//           if (!response.ok) throw Error(response.statusText);
//           return response.json();
//       })
//         .then(json => {
//           dispatch({ type: DISPLAY_PRODUCT_SUCCESS, payload: json });
//         })
//         .catch(error => {
//           dispatch({ type: DISPLAY_PRODUCT_FAILURE, error : ERROR_MESSAGE})
//         });
//     return data.data;
// }

// export function useSortProducts(type) {
//     const [data, dispatch] = useReducer(productReducer, initialState);
//     console.log("Type = " + type);

//     useEffect(() => {

//       console.log("stress")
//       // if (type != null) {
//         console.log("Masuk if. type = " + type)
//         fetch("https://api.mocki.io/v1/a135f562")
//         .then(response => {
//           if (!response.ok) throw Error(response.statusText);
//           return response.json();
//         })
//         .then(json => {
//           dispatch({ type: SORT_PRODUCT_SUCCESS, payload: json });
//         })
//         .catch(error => {
//           dispatch({ type: SORT_PRODUCT_FAILURE, error : ERROR_MESSAGE})
//         });
//       // }
//     }, []);
    
//     return data.data;
// }