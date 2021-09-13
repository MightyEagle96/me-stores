import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../../../../components/Navbar/Navbar';
import { categories } from '../../../../data/data';
import { httpService } from '../../../../data/services';
import { SideMenu } from '../SideMenu/SideMenu';
import { MyTable } from '../../../../assets/aesthetics/MyTable';
import { IsLoading } from '../../../../assets/aesthetics/IsLoading';
import DefaultLogo from '../../../../assets/images/small/defaultImg.png';
import './StoreManagement.css';
import Footer from '../../../../components/Footer/Footer';

export const StoreManagement = () => {
  const [formData, setFormData] = useState({});
  const [update, setUpdate] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const getProducts = async () => {
    setLoading(true);
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

  const createProduct = (e) => {
    e.preventDefault();
    setLoading(true);
    const path = 'stores';
    httpService.post(path, formData).then(() => {
      getProducts();
      setLoading(false);
      Swal.fire({
        icon: 'success',
        text: 'New product created',
        title: 'Success',
      }).then(() => setFormData({}));
    });
  };

  const updateProduct = async (itemId) => {
    setLoading(true);
    const path = `stores/${itemId}`;
    const res = await httpService.patch(path, formData);
    if (res) {
      setLoading(false);
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
          Swal.fire({ icon: 'success', text: 'Item Deleted', timer: 2000 });
        }
      }
    });
  };
  const columns = [
    { title: 'Product', field: 'itemName' },
    {
      title: 'Category',
      field: 'category',
      render: (rowData) => (
        <span>
          {
            categories.find((category) => category.key === rowData.category)
              .value
          }
        </span>
      ),
    },
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
                <div className="display-4">Store Management</div>
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
              <div className="border border-primary p-3">
                <form onSubmit={createProduct}>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="itemName">Item Name:</label>
                      <input
                        type="text"
                        name="itemName"
                        id="itemName"
                        className="form-control"
                        placeholder="Item Name"
                        value={formData.itemName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="category">Item Category:</label>
                      <select
                        id="category"
                        className="form-control"
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
                    <div className="col-md-4">
                      <label htmlFor="quantity">Item Quantity</label>
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        className="form-control"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        min={0}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="price">Item Price</label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        min={0}
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="imageUrl">Image Url</label>
                      <input
                        type="text"
                        name="imageUrl"
                        id="imageUrl"
                        className="form-control"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="Image Url"
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="col-md-4">
                      <label htmlFor="description">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        id="description"
                        cols="30"
                        rows="4"
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-3">
                    {!update ? (
                      <button className="btn btn-primary">
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
                    <button className="ms-2 btn btn-danger" type="reset">
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <hr />
            <div>
              <div className="d-flex justify-content-between">
                <div className="h3 text-danger">
                  PRODUCTS{' '}
                  <span>
                    <i class="fas fa-cart-plus"></i>
                  </span>
                </div>
                <div>
                  <button
                    onClick={getProducts}
                    className="btn btn-outline-danger"
                  >
                    Refresh
                  </button>
                </div>
              </div>
              <div>{loading ? <IsLoading color="text-danger" /> : ''}</div>
              <MyTable
                data={products}
                title="Goods in Store"
                columns={columns}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
