import axios from 'axios';

import Swal from 'sweetalert2';
export const backendUrl = 'http://192.168.8.110:4000';

const AUTH_TOKEN = localStorage.getItem('token') || '';

export const httpService = axios.create({
  baseURL: backendUrl,
  timeout: 10000,
  withCredentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

// .interceptors.response.use((response) => console.log(response.status));
httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      Swal.fire({ icon: 'error', titleText: error.response.data.message }).then(
        () => {
          localStorage.removeItem('token');
          localStorage.removeItem('loggedInUser');
          window.location.assign('/login');
        }
      );
    }
  }
);

export const loggedInUser =
  JSON.parse(localStorage.getItem('loggedInUser')) || null;

class DataService {
  loggedInUser() {
    return JSON.parse(localStorage.getItem('loggedInUser')) || null;
  }
  async logout() {
    const path = 'auth/logout';
    await httpService
      .post(path, {})
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
      })
      .then(() => window.location.assign('/login'));
  }
}

export const dataService = new DataService();
