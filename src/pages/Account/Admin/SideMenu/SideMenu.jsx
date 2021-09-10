import React from 'react';
import './SideMenu.css';

export const SideMenu = () => {
  return (
    <div className="dashboardPanel text-center">
      <div className="m-3">
        <a className="myLink" href="/dashboard">
          My Account{' '}
          <span className="ms-2">
            {' '}
            <i class="fa fa-user-circle" aria-hidden="true"></i>
          </span>
        </a>
        <hr />
      </div>
      <div className="m-3">
        <a className="myLink" href="/store-management">
          Store Management{' '}
          <span className="ms-2">
            {' '}
            <i class="fas fa-shopping-bag"></i>
          </span>
        </a>
        <hr />
      </div>
      <div className="m-3">
        <a className="myLink" href="/sales-report">
          Sales Report{' '}
          <span className="ms-2">
            {' '}
            <i class="fas fa-marker    "></i>
          </span>
        </a>
        <hr />
      </div>
      <div className="m-3">
        <a className="myLink" href="#!">
          Analytics{' '}
          <span className="ms-2">
            {' '}
            <i class="fas fa-chart-area    "></i>
          </span>
        </a>
        <hr />
      </div>
    </div>
  );
};
