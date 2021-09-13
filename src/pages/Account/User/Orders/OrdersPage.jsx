import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { IsLoading } from '../../../../assets/aesthetics/IsLoading';
import Footer from '../../../../components/Footer/Footer';
import Navbar from '../../../../components/Navbar/Navbar';
import { OrderItem } from '../../../../components/OrderItem/OrderItem';
import { dataService, httpService } from '../../../../data/services';
import { UserSideMenu } from '../UserSideMenu/UserSideMenu';
import './OrdersPage.css';

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = dataService.loggedInUser();
  const path = `order?user=${user._id}`;

  const getOrders = async () => {
    setLoading(true);
    const res = await httpService.get(path);
    if (res) {
      setOrders(res.data.orders);
      setLoading(false);
    } else {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        text: 'Error fetching your orders \n Please refresh or check your connectivity',
        timer: 50000,
        confirmButtonText: 'Ok',
      }).then(() => {
        getOrders();
      });
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="row">
        <div className="col-md-3">
          <UserSideMenu />
        </div>
        <div className="col-md-6">
          <div>
            {loading ? (
              <div className="text-center">
                <IsLoading color="text-success" />
              </div>
            ) : (
              <div>
                {/* <div className="text-center">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      getOrders();
                    }}
                  >
                    Refresh
                  </button>
                </div> */}
              </div>
            )}
          </div>
          {!loading ? (
            <div className="container">
              {orders.map((order, index) => {
                return (
                  <div key={index}>
                    <OrderItem product={order} />{' '}
                  </div>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="col-md-3 p-5">
          <div className="mt-3 alert alert-info p-3 shadow-lg">
            <p>Click here to view your order history</p>
            <button className="btn btn-success">Click</button>
          </div>
          <div className="mt-3 alert alert-warning p-3 shadow-lg">
            <p>Click here to claim discout bonus</p>
            <button className="btn btn-danger">Click</button>
          </div>
          <hr />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
