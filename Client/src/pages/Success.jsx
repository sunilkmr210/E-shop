import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { userRequest } from '../requestMethods';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Success() {

  const location = useLocation();
  console.log(location);
  //if you want to access state then this component should child component of the component which passed the state
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {

    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
            img: item.img,
          })),
          amount: cart.total,
          address: data.address_line1,
        });
        setOrderId(res.data._id);
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to="/">
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  );
}
