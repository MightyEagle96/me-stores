import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { dataService, httpService } from '../../../../data/services';
import Navbar from '../../../../components/Navbar/Navbar';
import { UserSideMenu } from '../UserSideMenu/UserSideMenu';
import './OrderPage.css';
import { IsLoading } from '../../../../assets/aesthetics/IsLoading';

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export const OrderPage = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  let [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const config = {
    public_key: 'FLWPUBK_TEST-99ba7379fc8300445fa7b8d744e631d6-X',
    tx_ref: Date.now(),
    amount: item.price * quantity,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    //redirect_url: 'http://localhost:3000/orders',
    customer: {
      email: dataService.loggedInUser().email,
      phone_number: dataService.loggedInUser().phoneNumber,
      name: dataService.loggedInUser().fullName,
    },
    customizations: {
      title: item.itemName,
      description: 'Payment for items in cart',
      logo: item.imageUrl,
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  const getItem = async () => {
    const path = `stores/${id}`;
    const res = await httpService.get(path);
    if (res) {
      setItem(res.data.item);
      setLoading(false);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  const incQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const makeOrder = async (amount, txRef, status, currency, transaction_id) => {
    const path = 'order';
    const body = {
      amount,
      txRef,
      status,
      quantity,
      product: item._id,
      currency,
      transaction_id,
    };

    try {
      const res = await httpService.post(path, body);
      if (res) {
        window.location.assign('/orders');
      }
    } catch (error) {}
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="row">
        <div className="col-md-3">
          <UserSideMenu />
        </div>
        <div className="col-md-9">
          {loading ? (
            <IsLoading color="text-success" />
          ) : (
            <div className="d-flex justify-content-center">
              <div className=" p-3 shadow">
                <div>
                  <img
                    src={item.imageUrl}
                    className="img-fluid"
                    alt={item.itemName}
                  />
                </div>
                <div className="mb-4">
                  <div className="">
                    <p>Item: {item.itemName}</p>
                  </div>
                  <div className="">
                    <p>
                      Price: N
                      {(parseInt(item.price) * quantity).toLocaleString()}
                      .00
                    </p>
                  </div>
                  <div className="">
                    <p>
                      Description:
                      {item.description ? (
                        <span>{item.description}</span>
                      ) : (
                        <span>
                          <em>Not available</em>
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p>Quantity:</p>
                    <button
                      className="me-2 btn btn-warning"
                      onClick={decQuantity}
                    >
                      -
                    </button>
                    {quantity}
                    <button
                      className="ms-2 btn btn-warning"
                      onClick={incQuantity}
                    >
                      +
                    </button>
                  </div>
                  <div className="mt-3 mb-3">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        handleFlutterPayment({
                          callback: async (response) => {
                            if (response.status === 'successful') {
                              await makeOrder(
                                response.amount,
                                response.tx_ref,
                                response.status,
                                response.currency,
                                response.transaction_id
                              );
                            }
                            closePaymentModal(); // this will close the modal programmatically
                          },
                          onClose: () => {},
                        });
                      }}
                    >
                      Make payment
                      <span className="ms-2">
                        <i class="fas fa-wallet    "></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
