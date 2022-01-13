

import React, {use,useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import {Box} from '@mui/system';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { getAuthorizationHeader } from '../utilities';
import { Tooltip, Zoom } from '@mui/material';
import shadows from '@material-ui/core/styles/shadows';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


import ButtonGroup from '@mui/material/ButtonGroup';
import { PinDropSharp } from '@material-ui/icons';



const ProductCard = (props) => {

    const [open, setOpen] = React.useState(false);

    const useStyles = makeStyles((theme) => ({
        root: {    
          minWidth: 345,
          maxWidth: 345,
          cursor:"pointer",
          boxShadow: "0 2px 10px skyblue",
          transition: "transform 200ms ease-in",
          borderRadius: "14px",
        },        
      }));
      
    const classes = useStyles();
    const price = `₹ ${props.productPrice*(1-(props.productDiscount/100))}`;
    const handleClose = () => {
        setOpen(false);
      };
      const handleToggle = () => {
        setOpen(!open);
      };

      const deleteItem=()=>{

      }


    
    return(
        <>
           
            <Card className={classes.root} variant="outlined" onClick={handleToggle}>
            <CardActionArea>
            <CardMedia
                component="img"
                height="200"
                image={props.imageUrl1}
            />
            <cardHeader>
                <Box textAlign='right' backgroundColor='pink'>
            <Typography gutterBottom variant="h7" component="div" color="text.primary">
                {props.productTag}
                </Typography>
                </Box>
            </cardHeader>
            <CardContent>   
                <Typography gutterBottom variant="h5" component="div">
                {props.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary" paddingBottom={"10px"}>
                {props.productDesc}
                </Typography>
                <Stack spacing={2} alignItems="right" >
                    <Stack direction="row" spacing={2}>
                    
                </Stack>
                <Chip label={price} size="large" color="success" variant="contained"/>
                </Stack>
                
            </CardContent>
            
            <CardActions  style={{justifyContent: 'right'}}>


<CardActions style={{justifyContent: 'left'}}>


</CardActions>
<Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={open}
  onClick={handleClose}
>
  <CircularProgress color="inherit" />
</Backdrop>

<ButtonGroup variant="text" aria-label="text button group" >
    
<Button size="small" >Edit</Button>
<Button size="small"  color="error" onClick={deleteItem()}>Delete</Button>

</ButtonGroup>  




    


     

</CardActions>           
            </CardActionArea>
            </Card>
        </>
    )
};



export default ProductCard;