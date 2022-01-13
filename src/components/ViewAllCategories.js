import * as React from 'react';
import { Button, Card } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import CategoryGrid from "./CategoryGrid";
import Box from '@mui/material/Box';
import AddCategory from './AddCategory';
import { useNavigate } from "react-router";



const ViewAllCategories = () => {
    const navigate = useNavigate();
    return(
        <>
            <Button size="small" variant="contained" color="success" onClick={()=>{navigate("/addcategories")}}>Add Category</Button>            
            <CategoryGrid/>
        </>
        )
};
export default ViewAllCategories;
