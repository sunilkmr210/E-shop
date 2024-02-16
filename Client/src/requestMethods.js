import axios from "axios";

//something to think about
//if this export is called twice the code above export let say publicrequest runs once

const BASE_URL = "http://localhost:5000/api/";
// const BASE_URL = process.env.REACT_APP_API_URL
console.log(process.env.REACT_APP_API_URL);

// const persistroot = localStorage.getItem("persist:root");
// console.log(persistroot);
// const curuser = persistroot ? JSON.parse(JSON.parse(persistroot).user).currentUser : null;
// const TOKEN = curuser ? curuser.accessToken : "";
// console.log(curuser);



// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzQ1ZmM4Yjg1ODIyMTc5YjljYWM1MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMzUwNzk4OSwiZXhwIjoxNzAzNzY3MTg5fQ.Z7FuIUGAiQps9AQMJ1_5pzRmiVcbCOymSjvzhQbynec";


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  // headers: { token: `Bearer ${TOKEN}` },
});

userRequest.interceptors.request.use(
  (config) => {
    const persistroot = localStorage.getItem("persist:root");
    console.log(persistroot);
    const curuser = persistroot ? JSON.parse(JSON.parse(persistroot).user).currentUser : null;
    const TOKEN = curuser ? curuser.accessToken : "";
    console.log(TOKEN);
    if (TOKEN) {
      // Set the Authorization header with the new token
      config.headers.token = `Bearer ${TOKEN}`;
    }
    else{
      config.headers.token = `Bearer ${""}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
