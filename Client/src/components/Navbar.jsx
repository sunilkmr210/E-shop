import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";
import { useState } from "react";

const Container = styled.div`
  height: 50px;
  /* background-color: blue; */
`;

const Wrapper = styled.div`
  height: 30px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: blue; */

`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  `;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Navbar = () => {
  // const hello = useSelector(state=>state.cart);
  // const total = useSelector(state=>state.cart.total);
  const quantity = useSelector(state => state.cart.quantity);
  // console.log(hello);
  console.log(quantity);
  // console.log(total);

  const LoginUser = useSelector(state=>state.user.currentUser);
  const dispatch = useDispatch();

  const handleClick = ()=>{
    dispatch(logout());
    const persistedState = JSON.parse(localStorage.getItem('persist:root'));
    const {user, ...newState} = persistedState;
    const newPersistedState = JSON.stringify(newState);
    localStorage.setItem('persist:root', newPersistedState);
  }

  const [query, setQuery] = useState("");

  const handleChange = (e)=>{
    setQuery(e.target.value);
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" value={query} onChange={handleChange}/>
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>E-SHOP</Logo>
        </Center>
        <Right>
          {!LoginUser&&<Link to="/register" style={{textDecoration: 'none', color: 'inherit'}}>
            <MenuItem>REGISTER</MenuItem>
          </Link>}
          {!LoginUser&&<Link to="/login" style={{textDecoration: 'none', color: 'inherit'}}>
            <MenuItem>SIGN IN</MenuItem>
          </Link>}
          {LoginUser&&<MenuItem onClick={handleClick}>SIGN OUT</MenuItem>}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
