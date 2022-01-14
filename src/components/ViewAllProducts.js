import { Button, Box, Divider, List, ListItem, CircularProgress } from "@material-ui/core";
import ProductCard from "./ProductCard";
import {Grid} from "@material-ui/core";
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { getAuthorizationHeader } from '../utilities';
import { makeStyles } from "@material-ui/core/styles";
import ReactPaginate from 'react-paginate';
import { display } from "@mui/system";

const ViewAllProducts = () => {
    const url='https://localhost:7075/api/Products';
    const[products,setProduct]= useState([]);
    const[searchTerm,setSearchTerm]=useState('');
    const[loading,setLoading]=useState(false);
    const[pageNumber,setPageNumber]=useState(0);
    const productsPerPage=1;
    const pagesVisited=pageNumber*productsPerPage;
    

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

    const displayProducts = filteredProducts
                .slice(pagesVisited,pagesVisited+productsPerPage)
                .map((product)=>{
                    return (
                        <>
                            <Grid item key={product.productId}>
                                <ProductCard
                                    imageUrl1 = {product.imageUrl1} 
                                    productName={product.productName}
                                    productTag = {product.productTag}
                                    productDesc = {product.productDesc}
                                    productDiscount ={product.productDiscount}
                                    productPrice = {product.productPrice} 
                                    productId = {product.productId}
                                    productObj = {product}
                                    />
                                </Grid>
                        </>
                    );
                });



const pageCount = Math.ceil(filteredProducts.length/productsPerPage);   


const changePage = ({selected}) => {    
    setPageNumber(selected);
}

    const useStyles = makeStyles((theme) => ({
        searchbox:{
            outline: "1px",
            width: "50vw",
            border: 1,
            float: "left",
            padding: "8px",
            background: "none",
            boxShadow:"0 2px 2px #379bff",
        }  
      }));

    const classes = useStyles(); 
         
    console.log(products);    
    
    return(
        <>        
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
                        {displayProducts}                    
                    </Grid>            
                </ListItem>
                <ListItem>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationButton"}
                        previousLinkClassName={"previousLink"}
                        nextLinkClassName={"nextLink"}
                        disabledClassName={"paginationDisable"}
                        activeClassName={"paginationActive"}
                    />
                </ListItem>
            </List>        
        </>
    )
};


export default ViewAllProducts;