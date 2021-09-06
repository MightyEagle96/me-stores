import React from 'react';
import './UserSideMenu.css';
export const UserSideMenu = () => {
  return (
    <div className="sideMenu">
      <ul>
        <li>
          <a href="/user">New Order</a>
        </li>
        <li>
          <a href="/orders">My Orders</a>
        </li>
      </ul>
    </div>
  );
};
