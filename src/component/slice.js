import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    list: [],
};

export const fetchTableData = createAsyncThunk('table/fetchTableData', async() => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
})

export const tableSlice = createSlice({
    name: 'api',
    initalState: {
        data: [],
        loading:false,
        error:null
    },
}
)

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { id, value } = action.payload;
            state.list.push({ id, value });
        },
        incrementItem: (state, action) => {
            const item = state.list.find(item => item.id === action.payload);
            if (item) {
                item.value += 1;
            }
        }, 
        decrementItem: (state, action) => {
            const item = state.list.find(item => item.id === action.payload);
            if (item && item.value > 0) {
                item.value -= 1;
            }
        },
        removeItem: (state, action) => {
            state.list = state.list.filter(item => item.id !== action.payload);
        },
        extraReducers: (builder) => {
            builder
                .addCase(todoSlice.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(todoSlice.fulfilled, (state, action) => {
                    state.loading = false;
                    state.tableData = action.payload;
                })
                .addCase(todoSlice.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                });
        }
        
    }
});

export const { addItem, incrementItem, decrementItem, removeItem,addTable } = todoSlice.actions;
export default todoSlice.reducer;
