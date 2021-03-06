import React from 'react';
import './CardItem.css';
import DefaultImage from '../../assets/images/small/defaultImg.png';

export const CardItem = ({
  id,
  price,
  imageUrl,
  itemName,
  isFavorite,
  addedToCart,
  addToCart,
  removeFromCart,
  loadCart,
  outOfStock,
}) => {
  return (
    <div className="myCard m-2 p-3 shadow-lg rounded">
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
          {isFavorite ? (
            <button className="btn text-danger">
              <i class="fas fa-heart"></i>
            </button>
          ) : (
            <button className="btn text-secondary">
              <i class="fas fa-heart"></i>
            </button>
          )}
        </div>
        <div>
          <b>N{price}.00</b>
        </div>
      </div>
      <div>
        {outOfStock ? (
          <span className="badge bg-danger">out of stock</span>
        ) : (
          ''
        )}
      </div>
      <hr />

      <div className="d-flex justify-content-between">
        {addedToCart ? (
          <div className="text-danger">
            <button
              className="btn text-danger"
              onClick={() => removeFromCart(id)}
            >
              <i class="fas fa-cart-plus"></i> Added to Cart
            </button>
          </div>
        ) : (
          <div>
            {loadCart ? (
              <div class="spinner-grow text-danger" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <button onClick={() => addToCart(id)} className="btn">
                <i class="fas fa-cart-plus"></i> Add to cart
              </button>
            )}
          </div>
        )}

        <div>
          {!outOfStock ? (
            <a href={`/order/${id}`} className="btn btn-success">
              Order Now
            </a>
          ) : (
            <button className="btn btn-success" disabled>
              {' '}
              Order Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
