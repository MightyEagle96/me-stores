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
          <div className="ms-3">
            <div className="h6">Product: {product.product.itemName}</div>
            <div className="h6">
              Amount paid: N{product.amount_paid.toLocaleString()}.00
            </div>
            <div className="h6">Quantity: {product.quantity}</div>
            <div className="h6">
              Date Ordered: {new Date(product.date_ordered).toDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
