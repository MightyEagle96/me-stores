import React, { useState, useEffect } from 'react';
import Navbar from '../../../../components/Navbar/Navbar';
import Footer from '../../../../components/Footer/Footer';
import { httpService } from '../../../../data/services';
import { SideMenu } from '../SideMenu/SideMenu';
import { IsLoading } from '../../../../assets/aesthetics/IsLoading';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import HttpErrorComponent from '../../../../assets/aesthetics/HttpError';

export const SalesReport = () => {
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getTotal = async () => {
    const path = 'stores/store/viewTransactions';
    const res = await httpService.get(path);
    if (res) {
      setTotal(res.data.total);
      setOrders(res.data.orders);
      setLoading(false);
    } else {
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    getTotal();
  }, []);
  const statusColor = (order) => {
    switch (order) {
      case 'awaiting fulfillment':
        return <span className="badge bg-danger">{order}</span>;
      case 'shipped':
        return <span className="badge bg-warning">{order}</span>;
      case 'fulfilled':
        return <span className="badge bg-success">{order}</span>;

      default:
        <span> jj</span>;
        break;
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="row pr-2 mt-2">
        <div className="col-md-3">
          <SideMenu />
        </div>
        <div className="col-md-9">
          <div className="d-flex flex-wrap">
            <div className="col-md-3 alert alert-info">
              <div className="h3">Sales Report</div>
              <hr />
              <div>
                Total Revenue:{' '}
                <span className="h5">N{total.toLocaleString()}.00</span>
              </div>
              <hr />
            </div>
            <div className="ml-3 col-md-3 alert alert-warning">
              <div className="h3">Items waiting fullfillment</div>
            </div>
          </div>

          <div>{loading ? <IsLoading color="text-success" /> : ''}</div>
          <div>{error ? <HttpErrorComponent /> : ''}</div>
          <div>
            <div>
              <MDBTable hover>
                <MDBTableHead color="success-color" textWhite>
                  <tr>
                    <th>Product</th>
                    <th>Amount Paid</th>
                    <th>Item Amount</th>
                    <th>Quantity Ordered</th>
                    <th>Status</th>
                    <th>Date Ordered</th>
                    <th>Delivery Status</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {orders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <a href={`/viewOrder/${order._id}`}>
                            {order.product.itemName}
                          </a>
                        </td>
                        <td>N{order.amount.toLocaleString()}.00</td>
                        <td>N{order.product.price.toLocaleString()}.00</td>
                        <td>{order.quantity}</td>
                        <td>
                          {order.status === 'successful' ? (
                            <span className="badge badge-success">
                              {order.status}
                            </span>
                          ) : (
                            <span className="badge badge-danger">
                              {order.status}
                            </span>
                          )}
                        </td>
                        <td>{new Date(order.date_ordered).toDateString()}</td>
                        <td>{statusColor(order.deliveryStatus)}</td>
                      </tr>
                    );
                  })}
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
