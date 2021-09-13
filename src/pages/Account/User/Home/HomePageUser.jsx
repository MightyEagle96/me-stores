import React, { useState, useEffect } from 'react';
import Navbar from '../../../../components/Navbar/Navbar';
import { UserSideMenu } from '../UserSideMenu/UserSideMenu';
import { IsLoading } from '../../../../assets/aesthetics/IsLoading';
import { httpService } from '../../../../data/services';
import { CardItem } from '../../../../components/CardItem/CardItem';
import { dataService } from '../../../../data/services';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import Footer from '../../../../components/Footer/Footer';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
export const HomePageUser = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [carts, setCarts] = useState([]);
  const [loadCart, setLoadCart] = useState(false);
  const [productId, setProductId] = useState('');
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({});
  const classes = useStyles();

  const getFavorites = async () => {
    const path = `favorite?user=${dataService.loggedInUser()._id}`;
    const res = await httpService.get(path);
    if (res) {
      setFavorites(res.data.favorite);
    }
  };

  const getCart = async () => {
    const path = `cart?user=${dataService.loggedInUser()._id}`;
    const res = await httpService.get(path);
    if (res) {
      setCarts(res.data.cart);
      setLoadCart(false);
    }
  };

  const isFavorite = (product) => {
    const fav = favorites.find((favorite) => favorite.item === product._id);
    if (fav) return true;
    else return false;
  };

  const addedToCart = (product) => {
    const cart = carts.find((cart) => {
      return cart.item._id === product._id;
    });
    if (cart) return true;
    else return false;
  };

  const addToCart = async (item) => {
    setProductId(item);
    setLoadCart(true);
    const path = 'cart';
    const body = { item };
    const res = await httpService.post(path, body);
    if (res) {
      getCart();
      setAlert({ severity: 'success', message: 'Product added to cart' });
      setOpen(true);
      setProductId('');
    }
  };
  const removeFromCart = async (item) => {
    setProductId(item);
    setLoadCart(true);
    const path = `cart/${item}`;
    const res = await httpService.delete(path);
    if (res) {
      getCart();
      setAlert({ severity: 'success', message: 'Product removed from cart' });
      setOpen(true);
      setProductId('');
    }
  };

  const showLoading = () => {
    const item = products.find((product) => product._id === productId);
    if (item) return true;
    else return false;
  };

  const getProducts = async () => {
    setLoading(true);
    const path = 'stores';
    const res = await httpService.get(path);
    if (res) {
      setLoading(false);
      setProducts(res.data.items);
    } else {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        text: "Can't fetch products at this time",
        confirmButtonText: 'Refresh',
      }).then(() => {
        getProducts();
      });
    }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getProducts();
    getFavorites();
    getCart();
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
            <div className="d-flex justify-content-center flex-wrap">
              {products.map((product, index) => {
                return (
                  <div key={index}>
                    <CardItem
                      id={product._id}
                      loadCart={showLoading()}
                      price={product.price.toLocaleString()}
                      imageUrl={product.imageUrl}
                      itemName={product.itemName}
                      isFavorite={isFavorite(product)}
                      addedToCart={addedToCart(product)}
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                      outOfStock={product.out_of_stock}
                      // loadCart={loadCart}
                    />
                    <div className={classes.root}>
                      <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                      >
                        <Alert onClose={handleClose} severity={alert.severity}>
                          {alert.message}
                        </Alert>
                      </Snackbar>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
