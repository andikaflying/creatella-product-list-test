import React from 'react';
import ProductGrid from './ProductGrid';
import * as ReducerActions from "../reducers/reducer";

function ProductPage() {
    const products = ReducerActions.useGetProducts();
    console.log("data displayed = " + JSON.stringify(products))

    return(
        <div class="container">
            { (products != null) && <ProductGrid products={products} /> }
        </div>
    )
};

export default ProductPage;