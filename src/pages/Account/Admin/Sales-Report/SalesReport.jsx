import React, { useState, useEffect } from 'react';
import Navbar from '../../../../components/Navbar/Navbar';
import { httpService } from '../../../../data/services';
import { SideMenu } from '../SideMenu/SideMenu';

export const SalesReport = () => {
  const [total, setTotal] = useState(0);

  const getTotal = async () => {
    const path = 'stores/store/viewTransactions';
    const res = await httpService.get(path);
    if (res) {
      setTotal(res.data.total);
    }
  };
  useEffect(() => {
    getTotal();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="row">
        <div className="col-md-3">
          <SideMenu />
        </div>
        <div className="col-md-6">
          <div className="alert alert-info">
            <div className="h3">Sales Report</div>
            <hr />
            <div className="h3">
              Total Revenue: <span>N{total.toLocaleString()}.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
