import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { httpService } from '../../../../data/services';
import Navbar from '../../../../components/Navbar/Navbar';
import { UserSideMenu } from '../UserSideMenu/UserSideMenu';
import './OrderPage.css';
import { IsLoading } from '../../../../assets/aesthetics/IsLoading';
import Swal from 'sweetalert2';

export const OrderPage = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  let [quantity, setQuantity] = useState(1);
  const { id } = useParams();

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
    const body = {
      product: item._id,
      amount_paid: Number(item.price) * quantity,
      quantity,
    };
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
            <div className="container shadow">
              <div>
                <img
                  src={item.imageUrl}
                  className="imgOrder"
                  alt={item.itemName}
                />
              </div>
              <div className="mb-4">
                <div className="">
                  <p>Item: {item.itemName}</p>
                </div>
                <div className="">
                  <p>
                    Price: N{(parseInt(item.price) * quantity).toLocaleString()}
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
                <div className="mt-3">
                  <button
                    onClick={makeOrder}
                    className="btn btn-outline-success"
                  >
                    Order now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
