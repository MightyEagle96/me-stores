import React, { useState, useEffect } from 'react';
import Navbar from '../../../../components/Navbar/Navbar';
import { UserSideMenu } from '../UserSideMenu/UserSideMenu';
import { IsLoading } from '../../../../assets/aesthetics/IsLoading';
import { httpService } from '../../../../data/services';
import { CardItem } from '../../../../components/CardItem/CardItem';

export const HomePageUser = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    const path = 'stores';
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      setProducts(res.data.items);
    }
  };
  useEffect(() => {
    getProducts();
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
            <div className="d-flex flex-wrap">
              {products.map((product, index) => {
                return (
                  <div key={index}>
                    <CardItem
                      price={product.price.toLocaleString()}
                      imageUrl={product.imageUrl}
                      itemName={product.itemName}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
