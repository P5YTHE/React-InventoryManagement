import { Button, Card, Box, Divider, TextField, List, ListItem, CircularProgress } from "@material-ui/core";
import ProductCard from "./ProductCard";
import {Grid} from "@material-ui/core";

import axios from 'axios';
import React, {use,useState, useEffect,useContext} from 'react';
import { getAuthorizationHeader } from '../utilities';
import { makeStyles } from "@material-ui/core/styles";
import { PhonelinkSetupTwoTone } from "@material-ui/icons";

const ProductContext = React.createContext();
//Provider(Distributer) and Consumer



const ViewAllProducts = () => {
    const url='https://localhost:7075/api/Products';
    const[products,setProduct]= useState([]);
    const[searchTerm,setSearchTerm]=useState('');
    const[loading,setLoading]=useState(false);
    const[currentPage,setCurrentPage]=useState(1);
    const[postsPerPage]=useState(12);

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
        if(searchTerm=="")
        {
            return product;
        } else if (product.productName.toLowerCase().includes(searchTerm.toLowerCase())){
            return product;
        }
    })    
         
     console.log(products);
    
    
    
    
    return(
        <>
        <ProductContext.Provider value={products}>
            <List>
                <ListItem>
            <span>  
                
                <input type="text" placeholder="Search...." className={classes.searchbox} onChange={event=>{setSearchTerm(event.target.value)}}></input>
            <Button size="big"  variant="contained" color="#379bff">
                Add Product
            </Button>
            </span>            
            <Box textAlign='center' padding={"40px"} color={"green"}>                       
             </Box>
             </ListItem>
             <Divider/>
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
                        productId = {product.productId}
                        />
                    </Grid>
              ))}                  
                   
            </Grid>            
            </ListItem>
            </List>
            
        </ProductContext.Provider>
        </>
    )
};




export default ViewAllProducts;