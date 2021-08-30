import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './SignUpPage.css';
import { httpService } from '../../data/services';
import Swal from 'sweetalert2';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { IsLoading } from '../../assets/aesthetics/IsLoading';
import { useHistory } from 'react-router';

export const SignUpPage = () => {
  const [formData, setFormData] = useState({ account_type: 'me-stores' });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUp = (e) => {
    e.preventDefault();
    setLoading(true);
    const path = 'auth/signUp';
    httpService.post(path, formData).then((res) => {
      if (res.data) {
        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('loggedInUser', JSON.stringify(res.data.user));
        Swal.fire({
          icon: 'success',
          iconColor: 'green',
          text: 'Account created',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => history.push('/dashboard'));
      }
    });
  };

  const classes = useStyles();
  return (
    <div>
      <Navbar></Navbar>
      <section className="signUp p-3">
        <div className="d-flex m-2 justify-content-center">
          <div className="shadow-lg">
            <div className="card p-3">
              <div className="h3 text-center">Create Your Account</div>
              <hr />
              <form onSubmit={signUp} className={classes.root}>
                <div>
                  <TextField
                    variant="filled"
                    label="First Name"
                    helperText="Enter your first name"
                    fullWidth
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <TextField
                    variant="filled"
                    label="Last Name"
                    helperText="Enter your last name"
                    fullWidth
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <TextField
                    variant="filled"
                    label="Email"
                    helperText="Enter your email address"
                    fullWidth
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <TextField
                    variant="filled"
                    label="Password"
                    type="password"
                    helperText="Enter your password"
                    fullWidth
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <InputLabel className="mb-2" id="demo-simple-select-label">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.role}
                    onChange={handleChange}
                    fullWidth
                    name="role"
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </div>
                <div className="mt-3 text-center">
                  <button type="submit" className="btn btn-primary">
                    {loading ? <IsLoading /> : 'Create Account'}
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
