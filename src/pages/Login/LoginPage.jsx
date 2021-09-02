import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './LoginPage.css';
import { httpService } from '../../data/services';

import Swal from 'sweetalert2';
import { IsLoading } from '../../assets/aesthetics/IsLoading';

export const LoginPage = () => {
  const defaultData = {};
  const [loginData, setLoginData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    } else {
      setLoading(true);
      const path = 'auth/login';
      const res = await httpService.post(path, loginData);
      setLoading(false);
      if (res) {
        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('loggedInUser', JSON.stringify(res.data.user));
        setLoading(false);
        Swal.fire({
          icon: 'success',
          titleText: 'Welcome',
          text: 'Logged in successfully',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          switch (res.data.user.role) {
            case 'user':
              return window.location.assign('/user');
            case 'admin':
              return window.location.assign('/dashboard');
            case 'storeAdmin':
              return window.location.assign('/dashboard');

            default:
              break;
          }
        });
      } else
        Swal.fire({
          icon: 'error',
          titleText: 'Network Error',
          text: 'There seems to be a problem communicating with the server',
          timer: 2000,
        });
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <section className="login">
        <div className="d-flex justify-content-center">
          <div className="shadow-lg rounded loginForm ">
            <div className="card p-3">
              <div className="h3 text-center">Login Here</div>
              <hr />
              <form onSubmit={login}>
                {error ? (
                  <div className="alert alert-danger">
                    Password and Email are required
                  </div>
                ) : (
                  ''
                )}
                <div>
                  <TextField
                    variant="filled"
                    label="Email/Username"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={loginData.email}
                    helperText="Enter your email address or username"
                    fullWidth
                  />
                </div>
                <div className="mt-3">
                  <TextField
                    variant="filled"
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={loginData.password}
                    helperText="Enter your password"
                    fullWidth
                  />
                </div>
                <div className="mt-3 text-center">
                  <button className="btn btn-primary" type="submit">
                    {loading ? <IsLoading /> : 'LOGIN'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
