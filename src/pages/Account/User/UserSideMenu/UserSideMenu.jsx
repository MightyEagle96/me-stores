import React from 'react';
import './UserSideMenu.css';
export const UserSideMenu = () => {
  return (
    <div className="sideMenu">
      <ul>
        <li>
          <a href="/order/:id">New Order</a>
        </li>
        <li>My Orders</li>
      </ul>
    </div>
  );
};
