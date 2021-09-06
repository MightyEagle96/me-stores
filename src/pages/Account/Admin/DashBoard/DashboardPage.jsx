import React from 'react';
import Navbar from '../../../../components/Navbar/Navbar';
import { SideMenu } from '../SideMenu/SideMenu';
import './DashboardPage.css';
export const DashboardPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="row">
        <div className="col md-3">
          <SideMenu />
        </div>
        <div className="col-md-9">
          <div>
            <div className="jumbotron jumbotron-fluid bg-info text-light p-3">
              <div className="container ">
                <div className="display-4">Welcome to ME-STORES</div>
                <hr />
                <p className="lead">View transactions for today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
