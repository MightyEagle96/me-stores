import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './HomePage.css';

export const HomePage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <header className="header">
        <div className="d-flex justify-content-center">
          <div className="text-light mt-5">
            <div className="h1">
              ME-STORES{' '}
              <span>
                <i class="fa fa-shopping-bag" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
