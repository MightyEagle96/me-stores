import React from 'react';
import './ProfilePage.css';
import Navbar from '../../../components/Navbar/Navbar';
import { UserSideMenu } from '../../../pages/Account/User/UserSideMenu/UserSideMenu';
import { dataService } from '../../../data/services';
export const ProfilePage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="row">
        <div className="col-md-3">
          <UserSideMenu></UserSideMenu>
        </div>
        <div className="col-md-6"></div>
        <div className="col-md-3">
          <div className="alert p-3 alert-info">
            <p>Name: {dataService.loggedInUser().fullName}</p>
            <p>Email: {dataService.loggedInUser().email}</p>
            <button
              type="button"
              data-mdb-toggle="modal"
              data-mdb-target="#exampleModal"
              className="btn btn-success"
            >
              Update Account
            </button>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-mdb-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
