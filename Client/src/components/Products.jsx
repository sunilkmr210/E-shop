import React from 'react'
import styled from "styled-components";
import Product from "./Product";
import { useState } from 'react';
import { useEffect } from 'react';
import { publicRequest } from '../requestMethods';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    margin: 10px;
    background-color: #f5f1f1;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;

export default function Products({ cat, filters, sort }) {

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [query1, setQuery1] = useState("");
  const [st, setSt] = useState(false);
  const location = useLocation();

  const handlePrev = () => {
    setPage(Math.max(1, page - 1));
    // console.log("hello1");
  }

  const handleNext = () => {
    setPage(page + 1);
    console.log(totalProducts);
    // console.log(page);  //here logging the old value shows async nature of react state updation
  }

  //getting searched products
  useEffect(() => {
    if (location.state) {
      setQuery1(location.state.searchQuery);
    }
  }, [location.state]);

  useEffect(() => {
    if (query1) {
      // console.log(query1);
      const searchedProducts = async () => {
        try {
          const res = await publicRequest.get(`/products/search?query2=${query1}`);
          setFilterProducts(res.data);
        } catch (err) {
          console.log(err);
        }
      }
      searchedProducts();
    }
  }, [query1]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const filterQuery = JSON.stringify(filters);
        const res = await publicRequest.get(`/products?category=${cat}&page=${page}&filters=${filterQuery}&sort=${sort}`);
        if((JSON.stringify(filters)!=(JSON.stringify({}))&&filters)||sort||cat) {
          setFilterProducts(res.data.product1);
          setTotalProducts(totalProducts+res.data.product1.length);
        }
        else {
          setProducts(res.data.product1);
          setTotalProducts(totalProducts+res.data.product1.length);
        }
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [page, st],);

  //Note - I have not combined sort, filter and category so you cannot
  //apply all these filters together, i mean you can set but response
  //will be illogical
  //so in below useEffect pass cat as a dependency and remove useEffects
  //for filter and sort just pass these var in cat useEffect

  useEffect(()=>{
    if((JSON.stringify(filters)!=(JSON.stringify({}))&&filters)||sort||cat){
      setPage(1);
      setSt(!st);
    }
  }, [cat, filters, sort])

  /*useEffect(() => {

    if (filters && JSON.stringify(filters)!=(JSON.stringify({}))) {
      const applyfilter = async () => {
        try {
          // console.log(filters);
          const filterQuery = JSON.stringify(filters);
          const res = await publicRequest.get(`products/?filters=${filterQuery}&page=${page}`);
          setFilterProducts(res.data.product1);
          setTotalProducts(res.data.total);
          // console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      }
      applyfilter();
    }

    // frontend filtering
    // cat && setFilterProducts(
    // products.filter(item =>
    //   Object.entries(filters).every(([key, value]) =>
    //     item[key].includes(value)
    //   )
    // )
    // );
  }, [page, st]);*/

  /*useEffect(() => {

    if (sort) {
      const applysort = async () => {
        try {
          const res = await publicRequest.get(`products/?sort=${sort}&page=${page}`);
          setFilterProducts(res.data.product1);
          setTotalProducts(res.data.total);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      }
      applysort();
    }



    // frontend sorting
    // if (sort == "newest") {
    //   setFilterProducts((prev) =>
    //     [...prev].sort((a, b) => b.createdAt - a.createdAt)
    //   );
    // }
    // else if (sort == "asc") {
    //   setFilterProducts((prev) =>
    //     [...prev].sort((a, b) => a.price - b.price)
    //   );
    // }
    // else {
    //   setFilterProducts((prev) =>
    //     [...prev].sort((a, b) => b.price - a.price)
    //   );
    // }

  }, [page, st])*/

  return (
    <>
      <Container>
        {(cat || (JSON.stringify(filters)!=(JSON.stringify({}))&&(filters)) || sort || query1)
          ? filterProducts.map((item) => <Product item={item} key={item.id} />)
          : products.map((item) => <Product item={item} key={item.id} />)}
      </Container>
      <Button disabled={page===1} onClick={handlePrev}>Prev</Button>
      <Button disabled={page===((totalProducts+1)/2)} onClick={handleNext}>Next</Button>
    </>
  );
};
