import React, { useState, useEffect } from 'react';
import Navbar from '../../../../components/Navbar/Navbar';
import { httpService } from '../../../../data/services';
import { SideMenu } from '../SideMenu/SideMenu';

export const SalesReport = () => {
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);

  const getTotal = async () => {
    const path = 'stores/store/viewTransactions';
    const res = await httpService.get(path);
    if (res) {
      console.log(res.data);
      setTotal(res.data.total);
      setOrders(res.data.orders);
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
        <div className="col-md-9">
          <div className="alert alert-info">
            <div className="h3">Sales Report</div>
            <hr />
            <div className="h3">
              Total Revenue: <span>N{total.toLocaleString()}.00</span>
            </div>
            <hr />
          </div>
          <div>
            <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Amount Paid</th>
                    <th>Item Amount</th>
                    <th>Quantity Ordered</th>
                    <th>Status</th>
                    <th>Date Ordered</th>
                    <th>Client's email</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>{order.product.itemName}</td>
                        <td>N{order.amount_paid.toLocaleString()}.00</td>
                        <td>N{order.product.price.toLocaleString()}.00</td>
                        <td>{order.quantity}</td>
                        <td>
                          <span className="badge badge-success">success</span>
                        </td>
                        <td>
                          {new Date(order.date_ordered).toLocaleDateString()}
                        </td>
                        <td>{order.user.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
