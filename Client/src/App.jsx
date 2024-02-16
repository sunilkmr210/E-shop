import { LocalGasStation } from '@material-ui/icons';
import './App.css';
import Home from './pages/Home';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { Provider } from 'react-redux';
import store from './redux/store';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect
} from "react-router-dom";
import Success from './pages/Success';
import Orders from './pages/Orders';
import Order from './pages/Order';
import User from './pages/User';
import Wishlist from './pages/Wishlist';


function App() {
  return (

    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/products/:category?" element={<ProductList />}></Route>
          <Route exact path="/product/:id" element={<Product />}></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="cart/success" element={<Success />}></Route>
          <Route exact path="/orders" element={<Orders />}></Route>
          <Route exact path="/orders/order" element={<Order/>}></Route>
          <Route exact path="/user" element={<User/>}></Route>
          <Route exact path="/wishlist" element={<Wishlist/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
