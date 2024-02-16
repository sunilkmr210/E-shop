import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { userRequest } from '../requestMethods'
import { update } from '../redux/userRedux'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
      center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  /* padding: 10px; */
  /* margin: auto; */
  justify-content: center;
`
const Wrapper = styled.div`
    display: flex;
    border: 2px solid lightgrey;
    border-radius: 5px;
    padding: 10px;
    width:50%;
    margin: 0px auto;
    /* margin: 0px 300px; */
`

const Title = styled.div`
    font-size: 30px;
    font-weight: 325;
    margin: 5px;
`

const Left = styled.div`
    flex: 1;
    align-items: center;
`
const Right = styled.div`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    border: 1px solid grey;
    border-radius: 5px;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`
const Button = styled.button`
  width: 15%;
  border: none;
  padding: 10px;
  margin: 15px 250px;
  background-color: teal;
  align-self: center;
  color: white;
  cursor: pointer;
`;


export default function User() {

    const user = useSelector(state => state.user.currentUser);

    //combine all three of these into one object notation and use 1 useState
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState();
    const [fetchedUser, setFetchedUser] = useState(user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleMobile = (e) => {
        setMobile(e.target.value);
    }

    
    const handleClick = ()=>{
        const updateUser = async ()=>{
            try{
                const res = await userRequest.put(`users/${user._id}`, {
                    name, mobile
                });
                dispatch(update({...res.data, accessToken: user.accessToken}));
                setFetchedUser(res.data);
                console.log(fetchedUser);
            }catch(err){
                console.log(err);
            }
        }
        updateUser();
        setName("");
        setEmail("");
        setMobile();
        navigate("/");
    }

    return (
        <Container>
            <Title>Your account details</Title>
            <Wrapper>
                <Left>
                    <div style={{fontSize: "18px"}}>Name</div>
                    <div style={{ margin: "20px 10px 0px 0px" }}>{fetchedUser.name}</div>
                </Left>
                <Right>
                    <div style={{fontSize: "18px"}}>Updated Name</div>
                    <Input value={name} onChange={handleName}></Input>
                </Right>
            </Wrapper>
            <Wrapper>
                <Left>
                    <div style={{fontSize: "18px"}}>Email</div>
                    <div style={{ margin: "20px 10px 0px 0px" }}>{fetchedUser.email}</div>
                </Left>
                <Right>
                    <div style={{fontSize: "18px"}}>Updated Email</div>
                    <Input value={email} onChange={handleEmail}></Input>
                </Right>
            </Wrapper>
            <Wrapper>
                <Left>
                    <div style={{fontSize: "18px"}}>Mobile No.</div>
                    <div style={{ margin: "20px 10px 0px 0px" }}>{fetchedUser.mobile}</div>
                </Left>
                <Right>
                    <div style={{fontSize: "18px"}}>Updated Mobile No.</div>
                    <Input value={mobile} onChange={handleMobile}></Input>
                </Right>
            </Wrapper>
            <Button onClick={handleClick}>Save</Button>
        </Container>
    )
}
