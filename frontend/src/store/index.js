import { configureStore } from '@reduxjs/toolkit';
import { orderReducer } from './reducers/orderReducer';
import { roadReducer } from './reducers/roadReducer';
import { userReducer } from './reducers/userReducer';

export const store = configureStore({ reducer: { road: roadReducer, user: userReducer, order: orderReducer } });
