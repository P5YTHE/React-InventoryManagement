import { Button, Card, Box } from "@material-ui/core";
import React from "react";
import ProductCard from "./ProductCard";
import {Grid} from "@material-ui/core";


const ViewAllProducts = () => {
    return(
        <>
            <Box textAlign='center' padding={"40px"}>            
            <Button size="big"  variant="contained" color="success">
                Add Product
            </Button>
             </Box>
            <Grid container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                >
                    <ProductCard/>                    
            </Grid>
              
            
        </>
    )
};




export default ViewAllProducts;