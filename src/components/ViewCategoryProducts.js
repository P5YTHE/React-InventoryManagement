import {Box, Divider,List, ListItem, CircularProgress } from "@material-ui/core";
import ProductCard from "./ProductCard";
import {Grid} from "@material-ui/core";
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { getAuthorizationHeader } from '../utilities';
import { makeStyles } from "@material-ui/core/styles";

const ViewCategoryProducts = (props) => {
    const url='https://localhost:7075/api/Products';
    const[products,setProduct]= useState([]);    
    const[loading,setLoading]=useState(false); 
    
    const useStyles = makeStyles((theme) => ({
            searchbox:{
                outline: "1px",
                width: "50vw",
                border: 1,
                float: "left",
                padding: "8px",
                background: "none",
                boxShadow:"0 2px 2px #379bff"
            }
        }));
    const classes = useStyles();

    useEffect(()=>{
        axios.get(url,getAuthorizationHeader()).then(response=>{
            setProduct(response.data);            
        })
        setLoading(true);
    },[url]);  
      

    const filteredProducts = products.filter((product)=>{
        if(product.categoryId==props.categoryId)
        {
            return product;
        }        
    })    
         
    console.log(products);    
    
    return(
        <>
            <List>                
                <ListItem>
                <Divider/>             
                    <Grid container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={4}
                    >             
                    {loading?(<></>):(<CircularProgress/>)}            
                    {filteredProducts.map(product =>(
                        <Grid item key={product.productId}>
                            <ProductCard
                                imageUrl1 = {product.imageUrl1} 
                                productName={product.productName}
                                productTag = {product.productTag}
                                productDesc = {product.productDesc}
                                productDiscount ={product.productDiscount}
                                productPrice = {product.productPrice}     
                                productObj = {product}                  
                                />
                        </Grid>
                    ))}                  
                    </Grid>            
                </ListItem>
            </List>            
        </>
    )
};




export default ViewCategoryProducts;