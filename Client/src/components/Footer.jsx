import { Link } from "react-router-dom"
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
    display: flex;
  `;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;

const Logo = styled.h1``;

const Desc = styled.p`
    margin: 20px 0px;
  `;

const SocialContainer = styled.div`
    display: flex;
  `;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;

const Center = styled.div`
    flex: 1;
    padding: 20px;
  `;

const Title = styled.h3`
    margin-bottom: 30px;
  `;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;

const ListItem = styled.span`
    width: 30%;
    margin: 20px;
    display: block;
  `;

const Right = styled.div`
    flex: 1;
    padding: 20px;
  
  `;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;

const Payment = styled.img`
      width: 50%;
  `;

const Footer = () => {

  const user = useSelector(state=>state.user.currentUser);

  return (
    <Container>
      <Left>
        <Logo>ESHOP</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem>Home</ListItem>
          </Link>
          {/* <Link to="/cart" style={{textDecoration: 'none', color: 'inherit'}}>
          <ListItem>Cart</ListItem>
          </Link> */}
          {/* <ListItem>Man Fashion</ListItem> */}
          {/* <ListItem>Woman Fashion</ListItem> */}
          {/* <ListItem>Accessories</ListItem> */}
          {user&&<Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem>My Account</ListItem>
          </Link>}
          {/* <Link to="/orders" style={{textDecoration: 'none', color: 'inherit'}}>
          <ListItem>Order Tracking</ListItem>
          </Link> */}
          {user&&<Link to="/wishlist" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem>Wishlist</ListItem>
          </Link>}
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 123 This Path , South Asia 12345
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@hello.dev
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
