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
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreProduct, page * LIMIT);

    const sorting = (e) => {
        const sortType = e.target.value;
        const totalProduct = page * LIMIT;
        fetch(ENDPOINT_SORT_PRODUCT + sortType + "&_limit=" + totalProduct)
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

    function fetchMoreProduct() {
        console.log("Product length = " + products.data.length)
        if (products.data.length < TOTAL_ALL_PRODUCTS) {
            setTimeout(() => {
                const nextPage = page + 1;
                setPage(nextPage)
                console.log("True or false : " + (products.data.length <= TOTAL_ALL_PRODUCTS));
                console.log("Product size = " + products.data.length)
                fetch(ENDPOINT_DISPLAY_PRODUCT + nextPage)
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
            { (products.data.length == TOTAL_ALL_PRODUCTS) && <h4 className="name center">~ end of catalogue ~</h4> }
        </div>
    )
};

export default ProductPage;