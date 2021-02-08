import { useEffect, useState, useReducer } from "react";
import ProductPage from '../components/ProductPage';

const Main = () => {
    return(
        <>
            <header>
                <h1>Products Grid</h1>
    
                <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
            </header>
            <section class="products">
                <ProductPage />
            </section>
        </>
    )
};

export default Main;