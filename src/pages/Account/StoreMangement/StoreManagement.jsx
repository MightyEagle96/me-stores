import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../../../components/Navbar/Navbar';
import { categories } from '../../../data/data';
import { httpService } from '../../../data/services';
import { SideMenu } from '../SideMenu/SideMenu';
import { MyTable } from '../../../assets/aesthetics/MyTable';
import { IsLoading } from '../../../assets/aesthetics/IsLoading';
import DefaultLogo from '../../../assets/images/small/defaultImg.png';
import './StoreManagement.css';

export const StoreManagement = () => {
  const [formData, setFormData] = useState({});
  const [update, setUpdate] = useState(false);
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const getProducts = async () => {
    const path = 'stores';
    const res = await httpService.get(path);
    if (res) {
      setProducts(res.data.items);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const createProduct = () => {
    const path = 'stores';
    httpService.post(path, formData).then(() => {
      getProducts();
      Swal.fire({
        icon: 'success',
        text: 'New product created',
        title: 'Success',
      }).then(() => setFormData({}));
    });
  };

  const updateProduct = async (itemId) => {
    const path = `stores/${itemId}`;
    const res = await httpService.patch(path, formData);
    if (res) {
      getProducts();
      Swal.fire({
        icon: 'success',
        text: 'Product updated',
        title: 'Success',
      }).then(() => setFormData({}));
    }
  };

  const editProduct = async (itemId) => {
    const path = `stores/${itemId}`;
    const res = await httpService.get(path);
    if (res) {
      setUpdate(true);
      setFormData(res.data.item);
    }
  };

  const deleteProduct = async (itemId) => {
    Swal.fire({
      icon: 'question',
      text: 'Are you sure you want to delete this item?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const path = `stores/${itemId}`;
        const res = await httpService.delete(path);
        if (res) {
          getProducts();
          Swal.fire({ icon: 'Success', text: 'Item Deleted', timer: 2000 });
        }
      }
    });
  };
  const columns = [
    { title: 'Product', field: 'itemName' },
    { title: 'Category', field: 'category' },
    {
      title: 'Price',
      field: 'price',
      render: (rowData) => <span>N{rowData.price.toLocaleString()}</span>,
    },
    {
      title: 'Quantity',
      field: 'quantity',
    },
    {
      title: 'Image',
      field: 'imageUrl',
      render: (rowData) =>
        rowData.imageUrl ? (
          <img
            className="imageUrl"
            alt={rowData.itemName}
            src={rowData.imageUrl}
          />
        ) : (
          <img className="imageUrl" alt={rowData.itemName} src={DefaultLogo} />
        ),
    },
    {
      title: 'Edit',
      field: '_id',
      render: (rowData) => (
        <button
          className="btn btn-warning"
          onClick={() => {
            editProduct(rowData._id);
          }}
        >
          Update
        </button>
      ),
    },
    {
      title: 'Delete',
      field: '_id',
      render: (rowData) => (
        <button
          className="btn btn-danger"
          onClick={() => {
            deleteProduct(rowData._id);
          }}
        >
          Danger
        </button>
      ),
    },
  ];
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
                    <div className="col-md-4">
                      <label htmlFor="">Item Quantity</label>
                      <input
                        type="number"
                        name="quantity"
                        id=""
                        className="form-control"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        min={0}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Item Price</label>
                      <input
                        type="number"
                        name="price"
                        id=""
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        min={0}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Image Url</label>
                      <input
                        type="text"
                        name="imageUrl"
                        id=""
                        className="form-control"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="Image Url"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    {!update ? (
                      <button
                        className="btn btn-primary"
                        onClick={createProduct}
                      >
                        Create product
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          updateProduct(formData._id);
                        }}
                      >
                        Update Product
                      </button>
                    )}
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
              {products.length ? (
                <MyTable
                  data={products}
                  title="Goods in Store"
                  columns={columns}
                />
              ) : (
                <div className="text-center">
                  <IsLoading color={'text-danger'} />{' '}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
