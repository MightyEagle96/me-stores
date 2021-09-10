import React, { useState, useEffect } from 'react';
import Footer from '../../../../components/Footer/Footer';
import Navbar from '../../../../components/Navbar/Navbar';
import { SideMenu } from '../SideMenu/SideMenu';
import { useParams } from 'react-router';
import { httpService } from '../../../../data/services';
import Swal from 'sweetalert2';
import { IsLoading } from '../../../../assets/aesthetics/IsLoading';
import HttpErrorComponent from '../../../../assets/aesthetics/HttpError';

export const ViewItemPage = () => {
  const [order, setOrder] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getOrder = async () => {
    setLoading(true);
    const path = `order/${id}`;
    const res = await httpService.get(path);

    if (res) {
      setOrder(res.data.order);
      setLoading(false);
    } else {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const fulfillOrder = async () => {
    const path = `order/${id}`;
    const body = { deliveryStatus: 'shipped' };

    const res = await httpService.patch(path, body);
    if (res) {
      Swal.fire({ icon: 'success', titleText: 'Item shipped' }).then(() => {
        window.location.assign('/sales-report');
      });
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
          {loading ? <IsLoading color="text-primary" /> : ''}
          {error ? <HttpErrorComponent /> : ''}
          <div className=" row">
            {!loading ? (
              <div className="col-md-4">
                <div className="h4">Product: {order.product.itemName}</div>
                <div>User's contact: {order.user.phoneNumber}</div>
                <div>User's address: {order.user.address}</div>

                {order.deliveryStatus === 'awaiting fulfillment' ? (
                  <div className="mt-2">
                    <button onClick={fulfillOrder} className="btn btn-primary">
                      Fulfill Order
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
