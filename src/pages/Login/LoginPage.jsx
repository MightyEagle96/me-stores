import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './LoginPage.css';
import { httpService } from '../../data/services';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { IsLoading } from '../../assets/aesthetics/IsLoading';

export const LoginPage = () => {
  const history = useHistory();
  const defaultData = {};
  const [loginData, setLoginData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    } else {
      setLoading(true);
      const path = 'auth/login';
      httpService
        .post(path, loginData)
        .then((res) => {
          if (res.data) {
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('loggedInUser', JSON.stringify(res.data.user));
            setLoading(false);
          }
        })
        .then(() =>
          Swal.fire({
            icon: 'success',
            titleText: 'Welcome',
            text: 'Logged in successfully',
            showConfirmButton: false,
            timer: 2000,
          }).then(() => history.push('/dashboard'))
        );
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
