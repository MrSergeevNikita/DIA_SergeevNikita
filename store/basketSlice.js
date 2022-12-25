import { createSlice } from '@reduxjs/toolkit';

const initialState = { basket: [] };

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, { payload }) => {
            console.log('setBasket');
            state.basket = payload;
        },
    },
});

export const basketReducer = basketSlice.reducer;

export const { setBasket } = basketSlice.actions;