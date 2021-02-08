import React from 'react';
import ProductGrid from './ProductGrid';
import { initialState, productReducer, DISPLAY_PRODUCT_SUCCESS, DISPLAY_PRODUCT_FAILURE,
         SORT_PRODUCT_SUCCESS, SORT_PRODUCT_FAILURE, ERROR_MESSAGE, 
         DISPLAY_PRODUCT_OTHER_PAGE_SUCCESS, DISPLAY_PRODUCT_OTHER_PAGE_FAILURE } from "../reducers/reducer";
import { useEffect, useState, useReducer } from "react";
import useInfiniteScroll from '../utilities/useInfiniteScroll';
import { ENDPOINT_DISPLAY_PRODUCT, ENDPOINT_SORT_PRODUCT,  ENDPOINT_DISPLAY_AD } from '../utilities/GeneralUtils';


function ProductPage() {
    const [products, dispatch] = useReducer(productReducer, initialState);
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreProduct);
    const [page, setPage] = useState(1)

    const sorting = (e) => {
        // console.log("Sort type = " + e.target.value)
        // fetch(ENDPOINT_SORT_PRODUCT + e.target.value)
        fetch(ENDPOINT_SORT_PRODUCT)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                    return response.json();
                }
            )
            .then(json => {
                dispatch({ type: SORT_PRODUCT_SUCCESS, payload: json });
            })
            .catch(error => {
                dispatch({ type: SORT_PRODUCT_FAILURE, error : ERROR_MESSAGE})
            }); 
    }

    useEffect(() => {
        // fetch(ENDPOINT_DISPLAY_PRODUCT + page)
        fetch("http://localhost:3000/products")
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                    return response.json();
                }
            )
            .then(json => {
                dispatch({ type: DISPLAY_PRODUCT_SUCCESS, payload: json });
            })
            .catch(error => {
                dispatch({ type: DISPLAY_PRODUCT_FAILURE, error : ERROR_MESSAGE})
            }); 
    }, []);

    function fetchMoreProduct() {
        setTimeout(() => {
          setPage(page + 1)
          setIsFetching(false);
        //   fetch(ENDPOINT_DISPLAY_PRODUCT + page)
          fetch(ENDPOINT_DISPLAY_PRODUCT)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                    return response.json();
                }
            )
            .then(json => {
                dispatch({ type: DISPLAY_PRODUCT_OTHER_PAGE_SUCCESS, payload: json });
            })
            .catch(error => {
                dispatch({ type: DISPLAY_PRODUCT_OTHER_PAGE_FAILURE, error : ERROR_MESSAGE})
            }); 
          
        }, 2000);
    }

    return(
        <div class="container">
            <div class="select">
                <select name="slct" id="slct" onChange={sorting} >
                    <option selected disabled>Sorted by .... </option>
                    <option value="size">Size</option>
                    <option value="price">Price</option>
                    <option value="id">ID</option>
                </select>
            </div>
            { (products != null) && <ProductGrid products={products.data} /> }
            {isFetching && 'Fetching more list items...' }
        </div>
    )
};

export default ProductPage;