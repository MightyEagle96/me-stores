import React from 'react';
import { MDBInput } from 'mdbreact';
import './AdminLoginPage.css';
import Navbar from '../../../../components/Navbar/Navbar';

export const AdminLoginPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <section className="adminLoginPage">
        <div className="d-flex justify-content-center">
          <div className="shadow-lg rounded loginForm ">
            <div className="card p-3">
              <div className="h3 mb-4 mt-4 text-center text-primary">
                Admin Staff Login
              </div>
              <hr className="bg-primary" />
              <form>
                <div className="grey-text">
                  <MDBInput
                    label="Type your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <div className="">
                    <MDBInput
                      label="Type your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                    />
                  </div>
                  <button className="btn btn-primary btn-block" type="submit">
                    LOGIN
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
