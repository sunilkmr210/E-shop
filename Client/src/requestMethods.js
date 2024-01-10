import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/";
const BASE_URL = process.env.REACT_APP_API_URL

const persistroot = localStorage.getItem("persist:root");
const curuser = persistroot?JSON.parse(JSON.parse(persistroot).user).currentUser:null;
const TOKEN = curuser?curuser.accessToken:"";
// console.log(curuser.accessToken);


// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzQ1ZmM4Yjg1ODIyMTc5YjljYWM1MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMzUwNzk4OSwiZXhwIjoxNzAzNzY3MTg5fQ.Z7FuIUGAiQps9AQMJ1_5pzRmiVcbCOymSjvzhQbynec";


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
