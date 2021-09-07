import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { dataService, httpService } from '../../../../data/services';
import Navbar from '../../../../components/Navbar/Navbar';
import { UserSideMenu } from '../UserSideMenu/UserSideMenu';
import './OrderPage.css';
import { IsLoading } from '../../../../assets/aesthetics/IsLoading';
import Swal from 'sweetalert2';
import { PaystackButton } from 'react-paystack';

export const OrderPage = () => {
  const publicKey = 'pk_test_9fc8977e12f3ba87232afd332f2bcc8e52e665cb';
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  let [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const body = {
    product: item._id,
    amount: Number(item.price) * quantity,
    quantity,
    publicKey,
    email: 'mightyeaglecorp@gmail.com',
    text: 'Pay Now',
    onSuccess: () =>
      alert('Thanks for doing business with us! Come back soon!!'),
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };
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
    setQuantity(quantity++);
  };
  const decQuantity = () => {
    setQuantity(quantity--);
  };

  const makeOrder = async () => {
    const path = 'order';
    const res = await httpService.post(path, body);
    if (res) {
      Swal.fire({ icon: 'success', text: 'Order completed' }).then(() => {
        window.location.assign('/user');
      });
    } else Swal.fire({ icon: 'error', text: 'Could not complete request ' });
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
              <div className="col-md-4 p-3 shadow">
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
                      Price: N{parseInt(item.price) * quantity}
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
                    <PaystackButton className="btn btn-success" {...body} />
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
