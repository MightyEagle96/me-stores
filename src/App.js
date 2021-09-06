import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/js/brands';
import '../node_modules/@fortawesome/fontawesome-free/js/solid';
import '../node_modules/@fortawesome/fontawesome-free/js/fontawesome';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/Home/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import { SignUpPage } from './pages/SignUp/SignUpPage';
import { DashboardPage } from './pages/Account/DashBoard/DashboardPage';

import { dataService } from './data/services';
import { StoreManagement } from './pages/Account/StoreMangement/StoreManagement';
import { HomePageUser } from './pages/Account/User/Home/HomePageUser';
import { OrderPage } from './pages/Account/User/Order/OrderPage';
import { OrdersPage } from './pages/Account/User/Orders/OrdersPage';
import { SalesReport } from './pages/Account/Admin/Sales-Report/SalesReport';
function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage}></Route>
      <Route exact path="/login">
        {dataService.loggedInUser() ? <DashboardPage /> : <LoginPage />}
      </Route>

      <Route exact path="/signUp" component={SignUpPage}></Route>
      <Route exact path="/dashboard" component={DashboardPage}></Route>
      <Route exact path="/user" component={HomePageUser}></Route>
      <Route exact path="/store-management">
        {dataService.loggedInUser() ? <StoreManagement /> : <LoginPage />}
      </Route>
      <Route exact path="/order/:id" component={OrderPage}></Route>
      <Route exact path="/orders" component={OrdersPage}></Route>
      <Route exact path="/sales-report" component={SalesReport}></Route>
    </Switch>
  );
}

export default App;
