import { Button, Card } from "@material-ui/core";
import React from "react";
import CategoryGrid from "./CategoryGrid";

const ViewAllCategories = () => {
    return(
        <>
            <Button size="small" variant="contained" color="success" >Add Category</Button>
            
            <CategoryGrid/>
        </>
    )
};




export default ViewAllCategories;
