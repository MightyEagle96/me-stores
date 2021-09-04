import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { httpService } from '../../../../data/services';
import Navbar from '../../../../components/Navbar/Navbar';
import { UserSideMenu } from '../UserSideMenu/UserSideMenu';
import './OrderPage.css';
import { IsLoading } from '../../../../assets/aesthetics/IsLoading';

export const OrderPage = () => {
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);
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
                  <p>Price: N{item.price.toLocaleString()}.00</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
