import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import StripeCheckout from 'react-stripe-checkout';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publicRequest, userRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { replaceCart } from "../redux/cartRedux";

const KEY = "pk_test_51ODrGDSIzR88W3v6bqyU4hFsioMrjprkU5E9Jnjx2liZGLb4ihzAKtZ6yWOHcgn7tuH4Kb3uRsx36VJom5H4OCZj008ozJAwIi"

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {

  const cart = useSelector(state => state.cart);
  const user1 = useSelector(state => state.user.currentUser);
  // console.log(user1);

  const [userCart, setUserCart] = useState([]);
  const dispatch = useDispatch();

  //fetching user specific cart
  useEffect(() => {
    console.log(user1);
    if (user1) {
      const getCart = async () => {
        try {
          const res = await userRequest.get(`carts/find/${user1._id}`);
          setUserCart(res.data);
          // console.log(res.data);

        } catch (err) {
          console.log(err);
        };
      }
      getCart();

    }
  }, [user1]);

  useEffect(() => {
    if (userCart && JSON.stringify(userCart) !== JSON.stringify([])) {
      dispatch(replaceCart({ products: userCart.products, quantity: userCart.quantity, total: userCart.total }));
      // console.log("nothello");
    }
    else {
      dispatch(replaceCart({ products: [], quantity: 0, total: 0 }));
      // console.log("hello");
    }
  }, [userCart]);

  //updating cart
  // useEffect(() => {
  //   if (user1) {
  //     const updateCart = async () => {
  //       try {
  //         const res = await userRequest.put(`carts/${user1._id}`, { products: cart.products });
  //         console.log("hello");
  //       } catch(err) {
  //         console.log(err);
  //        };
  //     }
  //     updateCart();
  //   }

  // }, [cart]);
  
  //decreasing or increasing quantity of a particular product in cart
  //concept of shallow copy using destructuring operator
  //how to use it for deep copy
  //only applies to objects

  const handleChange = (product, temp)=>{
    let tempProduct = product;
    let tempTotal = cart.total;
    let tempQ = cart.quantity;
    
    let flag = true;
    if(temp==="add"){
      tempProduct = {...product, quantity: product.quantity+1};
      tempTotal+=product.price;
    } 
    if(temp==="remove"){
      if(product.quantity>1) {
        tempProduct = {...product, quantity: product.quantity-1};
        tempTotal-=product.price;

      }
      else{
        flag = false;
        tempTotal-=product.price;
        tempQ-=1;
      }
    }
    
    const tempProducts = [...cart.products];
    const index = tempProducts.indexOf(product);
    if(flag) tempProducts[index] = tempProduct;
    else tempProducts.splice(index, 1);
    
    const changeCart = async ()=>{
      const res = await userRequest.put(`carts/${user1._id}`, {products: tempProducts, quantity: tempQ, total: tempTotal});
      setUserCart(res.data);
    }
    changeCart();
  }


  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  }


  //payment
  useEffect(() => {
    const makeRequest = async () => {
      try {
        console.log(stripeToken);
        const res = await publicRequest.post(
          "/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: cart.total * 100,
          }
        );
        navigate("/cart/success",
          {
            state: {
              stripeData: stripeToken.card,
              cart: cart
            }
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({userCart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {userCart && cart.products.map(product => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product.id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={()=>handleChange(product, "add")}/>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove onClick={()=>handleChange(product, "remove")}/>
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="E-shop"
              image="https://play-lh.googleusercontent.com/87lMDeEyGqhX7Go4QboaGZJL0azjfI7dWJCSyGDPUJ0ymq9yteNcYnSEnYN1zhIUtUA"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
