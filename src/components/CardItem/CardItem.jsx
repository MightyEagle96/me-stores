import React from 'react';
import './CardItem.css';
import DefaultImage from '../../assets/images/small/defaultImg.png';
export const CardItem = ({ price, imageUrl, itemName }) => {
  return (
    <div className="myCard m-3 p-3 shadow-lg rounded">
      <div
        className="myImage text-center"
        style={
          imageUrl
            ? {
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }
            : {
                backgroundImage: `url(${DefaultImage})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }
        }
      ></div>
      <div className="mt-3 mb-2">
        <h4>{itemName}</h4>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <i class="fas fa-heart"></i>
        </div>
        <div>
          <b>N{price}.00</b>
        </div>
      </div>
      <hr />

      <div className="d-flex justify-content-between">
        <div>
          <i class="fas fa-cart-plus"></i> Add to cart
        </div>
        <div>
          <button className="btn btn-success">Order now</button>
        </div>
      </div>
    </div>
  );
};
