import React from 'react';
import { getDisplayedDate } from "../utilities/DateUtils";
import { generateAd } from '../utilities/GeneralUtils';

const ProductGrid = ({ products }) => {
    const productGrid = products.map((product, index) => (
      <div>
        <div className="col-xs-12 col-md-6">
          <div className="prod-info-main prod-wrap clearfix">
          <div className="row">
              <div className="col-md-5 col-sm-12 col-xs-12">
                <div className="product-image">
                  <span className="img-responsive" style={{fontSize: product.size + 'px', textAlign: 'center'}}> {product.face} </span>
                </div>
              </div>
              <div className="col-md-7 col-sm-12 col-xs-12">
                <div className="product-deatil">
                  <h5 className="name">
                    <a href="#"> {product.id} </a>
                  </h5>
                  <p className="price-container">
                    <span>{'$' + product.price}</span>
                  </p>
                  <span className="tag1"></span>
                </div>
                <div className="description">

                </div>
                <div className="product-info smart-form">
                  <div className="row">
                    <div className="col-md-12">
                      <a href="javascript:void(0);" className="btn btn-danger">Add to cart</a>
                    </div>
                    <div className="col-md-12">
                      <div className="rating">
                        Date : {getDisplayedDate(product.date)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        { ((index+1) % 20 == 0) &&
          <div className="col-xs-12 col-md-12">
            <img class="ad" src={generateAd()} />
          </div>
        }
      </div>
    ))
  
    return productGrid
}

export default ProductGrid;