import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import { userRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/userRedux";

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
  
    &:hover ${Info}{
      opacity: 1;
    }
  `;

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  `;

const Image = styled.img`
    height: 75%;
    z-index: 2;
  `;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;

const Product = ({ item }) => {

  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (!user) {
      navigate('/login');
    }
    else {
      const inilist = user.wishlist;
      const updatelist = async () => {
        try {
          const res = await userRequest.put(`/users/${user._id}`, {
            wishlist: [...inilist, item],
          });
          dispatch(update({ ...res.data, accessToken: user.accessToken }));
          console.log({ ...res.data, accessToken: user.accessToken });
        } catch (err) {
          console.log(err);
        }
      }
      updatelist();
    }
  }

  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        {/* <Icon>
            <ShoppingCartOutlined />
          </Icon> */}
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon onClick={() => handleClick(item)}>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
