import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { userRequest } from '../requestMethods'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Order = styled.div`
flex: 1;
margin: 5px;
min-width: 280px;
height: 350px;
display: flex;
align-items: center;
justify-content: center;
background-color: #f5fbfd;
position: relative;
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


export default function Orders() {

    const user1 = useSelector(state => state.user.currentUser);
    const userId = user1._id;

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await userRequest.get(`/orders/find/${userId}`)
                setOrders(res.data);
            } catch(err) {
                console.log(err);
             };
        }
        getOrders();
    });

    const handleClick = (item)=>{
        navigate('/orders/order', {
            state : {
                order: item
            }
        })
    }

    return (
        <div>
            <Container>
                {orders.map((item) => 
                <Order onClick={()=>handleClick(item)}>
                    <Circle>
                        <Image src={item.products[0].img}>
                        </Image>
                    </Circle>
                </Order>
                )}
            </Container>
        </div>
    )
}
