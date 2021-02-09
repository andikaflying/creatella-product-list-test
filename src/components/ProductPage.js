import React from 'react';
import ProductGrid from './ProductGrid';
import { initialState, productReducer, DISPLAY_PRODUCT_SUCCESS, DISPLAY_PRODUCT_FAILURE,
         SORT_PRODUCT_SUCCESS, SORT_PRODUCT_FAILURE, ERROR_MESSAGE, 
         DISPLAY_PRODUCT_OTHER_PAGE_SUCCESS, DISPLAY_PRODUCT_OTHER_PAGE_FAILURE } from "../reducers/reducer";
import { useEffect, useState, useReducer } from "react";
import useInfiniteScroll from '../utilities/useInfiniteScroll';
import { ENDPOINT_DISPLAY_PRODUCT, ENDPOINT_SORT_PRODUCT,  ENDPOINT_DISPLAY_AD, 
         LIMIT, TOTAL_ALL_PRODUCTS } from '../utilities/GeneralUtils';


function ProductPage() {
    const [products, dispatch] = useReducer(productReducer, initialState);
    const [page, setPage] = useState(1);
    const [sortType, setSortType] = useState("");
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreProduct, page * LIMIT);

    //call sorting API
    const sorting = (e) => {
        const type = e.target.value;
        setSortType(type);
        const totalProduct = page * LIMIT;
        fetch(ENDPOINT_SORT_PRODUCT + type + "&_limit=" + totalProduct)
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

    //first render, call displaying product endpoint in first page
    useEffect(() => {
        fetch(ENDPOINT_DISPLAY_PRODUCT + page)
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

    //call display product for next page after scrolled at bottom
    async function fetchMoreProduct() {
        if (products.data.length < TOTAL_ALL_PRODUCTS) {
            await setTimeout(() => {
                const nextPage = page + 1;
                setPage(nextPage)
                fetch(ENDPOINT_DISPLAY_PRODUCT + nextPage + "&_sort=" + sortType)
                  .then(response => {
                      if (!response.ok) throw Error(response.statusText);
                          return response.json();
                      }
                  )
                  .then(json => {
                      dispatch({ type: DISPLAY_PRODUCT_OTHER_PAGE_SUCCESS, payload: json });
                      setIsFetching(false);
                  })
                  .catch(error => {
                      dispatch({ type: DISPLAY_PRODUCT_OTHER_PAGE_FAILURE, error : ERROR_MESSAGE})
                      setIsFetching(false);
                  }); 
            }, 2000);
        }
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
            {(isFetching && (products.data.length < TOTAL_ALL_PRODUCTS)) && <h4 className="name center"> Loading... </h4> }
            { (products.data.length >= TOTAL_ALL_PRODUCTS) && <h4 className="name center">~ end of catalogue ~</h4> }
        </div>
    )
};

export default ProductPage;