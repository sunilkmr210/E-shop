import {createSlice} from "@reduxjs/toolkit"

export const productSlice = createSlice({
    name: "product",
    initialState:{
        products: [],
        pending: false,
        error: false,
    },
    reducers:{

    }
});