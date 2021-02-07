import React from 'react';
import ProductGrid from './ProductGrid';
import { initialState, productReducer, DISPLAY_PRODUCT_SUCCESS, DISPLAY_PRODUCT_FAILURE,
         SORT_PRODUCT_SUCCESS, SORT_PRODUCT_FAILURE, ERROR_MESSAGE, 
         DISPLAY_PRODUCT_OTHER_PAGE_SUCCESS, DISPLAY_PRODUCT_OTHER_PAGE_FAILURE } from "../reducers/reducer";
import { useEffect, useState, useReducer } from "react";
import useInfiniteScroll from '../utilities/useInfiniteScroll';

function ProductPage() {
    const [products, dispatch] = useReducer(productReducer, initialState);
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreProduct);


    const sorting = (e) => {
        fetch("https://api.mocki.io/v1/a135f562")
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
        fetch("https://api.mocki.io/v1/a135f562")
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
          console.log("fetch more product") 
          fetch("https://api.mocki.io/v1/a135f562")
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
          setIsFetching(false);
        }, 1000);
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