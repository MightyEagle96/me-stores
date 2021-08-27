import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../../../components/Navbar/Navbar';
import { categories } from '../../../data/data';
import { httpService } from '../../../data/services';
import { SideMenu } from '../SideMenu/SideMenu';
import { MyTable } from '../../../assets/aesthetics/MyTable';

export const StoreManagement = () => {
  const [formData, setFormData] = useState({});
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const getProducts = () => {
    const path = 'stores';
    httpService.get(path).then((res) => setProducts(res.data.items));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const createProduct = () => {
    const path = 'stores';
    httpService.post(path, formData).then(() => {
      Swal.fire({
        icon: 'success',
        text: 'New product created',
        title: 'Success',
      }).then(() => setFormData({}));
    });
  };
  const columns = [{ title: '' }];
  return (
    <div>
      <Navbar></Navbar>
      <div className="row">
        <div className="col-md-3">
          <SideMenu></SideMenu>
        </div>
        <div className="col-md-9">
          <div>
            <div className="jumbotron jumbotron-fluid bg-danger text-light p-3">
              <div className="container">
                <div className="display-4">STORE MANAGEMENT</div>
                <hr />
                <p className="lead"></p>
              </div>
            </div>
          </div>
          <div className="mt-3 container">
            <div>
              <div className="h3 text-primary">
                Add a new item{' '}
                <span>
                  <i class="fa fa-cart-plus" aria-hidden="true"></i>
                </span>
              </div>
              <div className="">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="">Item Name:</label>
                    <input
                      type="text"
                      name="itemName"
                      className="form-control"
                      placeholder="Item Name"
                      value={formData.itemName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="">Item Category:</label>
                    <select
                      id=""
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      {categories.map((category, index) => {
                        return (
                          <option key={index} value={category.key}>
                            {category.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="row">
                    <div className="col-md-3">
                      <label htmlFor="">Item Quantity</label>
                      <input
                        type="number"
                        name="quantity"
                        id=""
                        className="form-control"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="">Item Price</label>
                      <input
                        type="number"
                        name="price"
                        id=""
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <button className="btn btn-primary" onClick={createProduct}>
                      Create product
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <div className="text-center h3 text-danger">
                PRODUCTS{' '}
                <span>
                  <i class="fas fa-cart-plus"></i>
                </span>
              </div>
              <MyTable columns={products} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
