import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    product: {},
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, { payload }) => {
            console.log('setProducts');
            state.products = payload;
        },
        setProduct: (state, { payload }) => {
            console.log('setProduct');
            state.product = payload;
        },
        resetProduct: (state) => {
            console.log('resetProduct');
            state.product = {};
        },
    },
});

export const productReducer = productSlice.reducer;

export const { setProducts, setProduct, resetProduct } = productSlice.actions;
