import React from 'react'
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

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

export default function Products({ cat, filters, sort, query }) {

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const handlePrev = ()=>{
    setPage(Math.max(1, page-1));
  }

  const handleNext = ()=>{
    setPage(page+1);
    // console.log(page);  //here logging the old value shows async nature of react state updation
  }

  useEffect(()=>{
    const total = async () => {
      try{
        const res = await axios.get("http://localhost:5000/api/products/total");
        setTotalProducts(res.data);
      }catch(err){
      }
    }
    total();
  })

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}&?page=${page}`
            : `http://localhost:5000/api/products?page=${page}`);
        setProducts(res.data);
        setFilterProducts(res.data);
      } catch (err) {
      }
    };
    getProducts();
  }, [cat, page]);

  useEffect(() => {
    cat && setFilterProducts(
      products.filter(item =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
  }, [filters]);

  useEffect(() => {
    // console.log(sort);
    console.log(filterProducts);
    if (sort == "newest") {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => b.createdAt - a.createdAt)
      );
    }
    else if (sort == "asc") {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    }
    else {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
    console.log(filterProducts);
  }, [sort])

  return (
    <>
      <Container>
        {(cat||filters||sort)
          ? filterProducts.map((item) => <Product item={item} key={item.id} />)
          : products.map((item) => <Product item={item} key={item.id} />)}
      </Container>
      <Button onClick={handlePrev}>Prev</Button>
      <Button onClick={handleNext}>Next</Button>
    </>
  );
};
