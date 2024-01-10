import React from 'react'
import Topbar from './components/topbar/topbar'
import Sidebar from './components/sidebar/sidebar'
import Home from './pages/home/home'
import UserList from './pages/userList/userList'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import User from './pages/user/user'
import NewUser from './pages/NewUser/NewUser'
import ProductList from './pages/productList/ProductList'
import NewProduct from './pages/NewProduct/NewProduct'
import Product from './pages/product/product'
import Login from './pages/login/login'

export default function App() {
  return (
    <div>
      <Router>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/users" element={<UserList />}></Route>
            <Route exact path="/user/:userId" element={<User />}></Route>
            <Route exact path="/newUser" element={<NewUser />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/products" element={<ProductList />}></Route>
            <Route exact path="/product/:productId" element={<Product />}></Route>
            <Route exact path="/newProduct" element={<NewProduct />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  )
}
