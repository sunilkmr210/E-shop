import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import { publicRequest } from "../requestMethods";
import { Navigate } from "react-router-dom";
 
export const login = async (dispatch, user)=>{
    dispatch(loginStart());
    try{
        const res = await publicRequest.post('/auth/login', user)
        dispatch(loginSuccess(res.data));
        <Navigate replace to='/'></Navigate>
    }catch(err){
        dispatch(loginFailure())
    }
}