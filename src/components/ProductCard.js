

import React, {use,useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import {Box} from '@mui/system';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';


const ProductCard = () => {

    const url='';
    const[products,setProduct]= useState(null);

    const useStyles = makeStyles((theme) => ({
        cards: {    
          minWidth: 345,
          maxWidth: 345,
        },        
      }));
      
    const classes = useStyles();


    useEffect(()=>{
        axios.get(url).then(response=>{
            setProduct(response.data);
        })
    },[url]);      

    return(
        <>   
            <Card className={classes.cards} variant="outlined">
            <CardActionArea>
            <CardMedia
                component="img"
                height="200"
                image="https://5.imimg.com/data5/SH/GC/MY-8764775/mens-t-shirt-500x500.jpg"                
            />
            <cardHeader>
                <Box textAlign='right' backgroundColor='pink'>
            <Typography gutterBottom variant="h7" component="div" color="text.primary">
                Best Seller
                </Typography>
                </Box>
            </cardHeader>
            <CardContent>   
                <Typography gutterBottom variant="h5" component="div">
                Tshirt
                </Typography>
                <Typography variant="body2" color="text.secondary" paddingBottom={"10px"}>
                Cotton tshirt from peter england
                </Typography>
                <Stack spacing={5} alignItems="right" >
                    <Stack direction="row" spacing={5}>
                    <Chip label="Rs 450" color="success" variant="outlined"/>
                </Stack>
                </Stack>
            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
                <Button size="small" variant="contained" color="error">Delete</Button>
            </CardActions>
            </CardActionArea>
            </Card>
        </>
    )
};



export default ProductCard;