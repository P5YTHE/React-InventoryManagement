import { Button, Card } from "@material-ui/core";
import React from "react";
import ProductCard from "./ProductCard";

const ViewAllProducts = () => {
    return(
        <>
            <Button size="small" variant="contained" color="success">Add Product</Button>
            
            <ProductCard/>
        </>
    )
};




export default ViewAllProducts;