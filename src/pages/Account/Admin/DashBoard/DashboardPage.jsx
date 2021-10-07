import React, { useState, useEffect } from 'react';
import Navbar from '../../../../components/Navbar/Navbar';
import { httpService } from '../../../../data/services';
import { SideMenu } from '../SideMenu/SideMenu';
import './DashboardPage.css';

export const DashboardPage = () => {
  const [storeDetail, setStoreDetail] = useState({});
  const getTransactionCount = async () => {
    const path = 'stores/store/orderCount';
    const res = await httpService.get(path);

    if (res) {
      setStoreDetail(res.data);
    }
  };

  useEffect(() => {
    getTransactionCount();
  });

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
            <div>
              <div className="row">
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body bg-white">
                      <div className="h4">Orders</div>
                      <hr />
                      <div className="h5">{storeDetail.orders}</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-body bg-white">
                      <div className="h4">Total number of products</div>
                      <hr />
                      <div className="h5">{storeDetail.products}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
