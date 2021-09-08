import React from 'react';
import './UserSideMenu.css';
export const UserSideMenu = () => {
  return (
    <div className="dashboardPanel text-center">
      <div className="m-3">
        <a className="myLink" href="/user">
          New Order
          <span className="ml-2">
            <i class="fa fa-shopping-bag" aria-hidden="true"></i>
          </span>
        </a>
      </div>
      <div className="m-3">
        <a className="myLink" href="/orders">
          My Orders
          <span className="ml-2">
            <i class="fa fa-shopping-bag" aria-hidden="true"></i>
          </span>
        </a>
      </div>
    </div>
  );
};
