import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../component/slice.js';

export const store = configureStore({
    reducer: {
        todo: todoReducer,
    }
});
