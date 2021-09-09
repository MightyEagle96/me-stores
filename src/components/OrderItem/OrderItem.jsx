import React from 'react';
import './OrderItem.css';
export const OrderItem = ({ product }) => {
  return (
    <div>
      <div className="mt-3  p-3 shadow-lg rounded">
        <div className="d-flex align-items-start">
          <div>
            <img
              className="orderImg"
              src={product.product.imageUrl}
              alt={product.product.itemName}
            />{' '}
          </div>
          <div className="ml-3">
            <div>
              Product: <span className="h6">{product.product.itemName}</span>
            </div>
            <div>
              Amount paid:{' '}
              <span className="h6">N{product.amount.toLocaleString()}.00</span>
            </div>
            <div>
              Quantity: <span className="h6">{product.quantity}</span>
            </div>
            <div>
              Date Ordered:{' '}
              <span className="h6">
                {new Date(product.date_ordered).toDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
