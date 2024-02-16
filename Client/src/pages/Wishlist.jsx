import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';

import { userRequest } from '../requestMethods'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { update } from '../redux/userRedux';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

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

const Product = styled.div`
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



export default function Wishlist() {

    const user1 = useSelector(state => state.user.currentUser);
    const userId = user1._id;

    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const getList = async () => {
            try {
                const res = await userRequest.get(`/users/find/${userId}`)
                setList(res.data.wishlist);
            } catch (err) {
                console.log(err);
            };
        }
        getList();
    }, []);

    const handleClick = (item) => {
        navigate(`/product/${item._id}`);
    }

    const handleRemove = (item) => {
        const tempList = [...user1.wishlist];
        const index = tempList.findIndex((wi)=>wi.id===item.id);
        tempList.splice(index, 1);
        const removeList = async () => {
            try {
                const res = await userRequest.put(`/users/${userId}`, {
                    wishlist: tempList,
                });
                setList(tempList);
                console.log(res.data);
                dispatch(update({ ...res.data, accessToken: user1.accessToken }));
            } catch (err) {
                console.log(err);
            }
        }
        removeList();
    }

    return (
        <div>
            <Container>
                {list.map((item) =>
                    <Product onClick={() => handleClick(item)}>
                        <Circle>
                            <Image src={item.img}>
                            </Image>
                            <Info>
                                <Icon onClick={(event) => { event.stopPropagation(); handleRemove(item) }}>
                                    <ClearIcon />
                                </Icon>
                            </Info>
                        </Circle>
                    </Product>
                )}
            </Container>
        </div>
    )
}
