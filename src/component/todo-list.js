import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { addItem, incrementItem, decrementItem, removeItem} from '../component/slice.js';
import Stack from '@mui/material/Stack';

const TodoList = () => {
    const [number, setNumber] = useState('');
    console.log('number');
    const list = useSelector((state) => state.todo.list);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAdd = () => {
        const value = Number(number);
        if (number !== '' && !isNaN(value) && !list.some(item => item.value === value)) {
            dispatch(addItem({ id: Date.now(), value }));
            setNumber('');
        }
    };

    const handleIncrement = (id) => {
        dispatch(incrementItem(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementItem(id));
    };

    const handleRemove = (id) => {
        dispatch(removeItem(id));
    };
    const handleTable = (id) => {
        navigate(`/add-table/${id}`); // Navigate to new page with the item's ID
    };

    return (
        <Box align="center">
            <Typography variant="h2" margin={6}>TODO LIST</Typography>
            <Container>
                <TextField 
                    type='number' 
                    label="Enter a number" 
                    variant="filled" 
                    value={number} 
                    onChange={(e) => setNumber(e.target.value)} 
                />
                <Button 
                    variant="contained" 
                    color="success"  
                    sx={{ fontSize: 20, padding: 1, marginLeft: 1 }} 
                    onClick={handleAdd}
                >
                    Add
                </Button>    
            </Container>

            <List sx={{ marginTop: 2, width: '100%', maxWidth: 360,  fontSize: 35 }}>
                {list.map((item) => (
                    <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemText primary={item.value} sx={{ fontSize: 35 }} />
                        <IconButton onClick={() => handleIncrement(item.id)} color="primary">
                            <Add />
                        </IconButton>
                        
                        <IconButton 
                            onClick={() => handleDecrement(item.id)} 
                            color="secondary" 
                            disabled={item.value === 0}
                        >
                            <Remove />
                        </IconButton>
                        
                        <IconButton onClick={() => handleRemove(item.id)} color="error">
                            <Delete />
                        </IconButton>
                        <Stack>
                            <Button 
                                sx={{ backgroundColor: 'red', color: 'white',  }} 
                                onClick={() => handleTable(item.id)}
                            >
                                Add Table
                            </Button>
                        </Stack>  
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TodoList;
