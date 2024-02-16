import React from 'react'
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  min-height: 250vh;
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


export default function Order() {

    const location = useLocation();
    const order1 = location.state.order;
    const products1 = order1.products;
    // console.log(products1);

    return (
        <div>
            <Container>
                {products1.map((item) => 
                <Product>
                  {console.log(item)}
                    <Circle>
                        <Image src={item.img}>
                        </Image>
                    </Circle>
                </Product>
                )}
            </Container>
        </div>
    )
}
