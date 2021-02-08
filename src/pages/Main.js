import { useEffect, useState, useReducer } from "react";
import ProductPage from '../components/ProductPage';
import { generateAdIndex, useLocalStorage, AD_IMAGE_URL } from '../utilities/GeneralUtils';

const Main = () => {
    const [addIndexList, setAddIndexList] = useLocalStorage('adList', new Array());
    const [adURL, setAdURL] = useState("");

    useEffect(() => {
        console.log("Index list first = " + JSON.stringify(addIndexList))
        const index = generateAdIndex(addIndexList)
        const newList = [...addIndexList, index]

        setAddIndexList(newList)
        setAdURL(AD_IMAGE_URL + index)
    }, []);

    return(
        <>
            <header>
                <h1>Products Grid</h1>
    
                <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
    
                <p>But first, a word from our sponsors:</p> 
                <img class = "ad" src={adURL} />
            </header>
            <section class="products">
                {/* <ProductPage /> */}
            </section>
        </>
    )
};

export default Main;