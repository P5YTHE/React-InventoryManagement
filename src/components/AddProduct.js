import React from 'react';
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Input } from '@mui/material';
import axios, { Axios } from 'axios';
import {use,useState, useEffect} from 'react';
import { getAuthorizationHeader } from '../utilities';
import Auth from "../Auth/Auth"
import SizesInput from './SizesInput';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "100%",
    borderRadius: "50px",
    border: "2.5px solid #1976D2 ",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  gridContent: {
    width: "60vh",
    margin: "0px",
  },
  gridStyle:{
    border: "3px",
  }
  }));

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <Switch {...other} />;
  })(({ theme, expand }) => ({
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));



function AddProduct(){
    const classes = useStyles();
    
    //to set sizesExist from toggle/switct button
    const[sizesExist,setSizeExist]=useState(false);

    //to get and set categoryId from dropdown list
    const[categoryId,setCategoryId]=useState('');

    //to fetch catgory in dropdown list
    const categoryUrl='https://localhost:7157/api/Categories';
    const[category,setCategory]=useState([]);

    useEffect(()=>{
        axios.get(categoryUrl,getAuthorizationHeader()).then(response=>{
            setCategory(response.data);
        })
    },[categoryUrl]);
    //category fetch end

    
    //to post product
    const productUrl='https://localhost:7075/api/Products';
    const[productData,setProductData]=useState({
      productId:"",
      productName: "",
      productDesc: "",
      productTag: "",
      imageUrl1: "",
      imageUrl2: "",
      imageUrl3: "",
      imageUrl4: "",
      imageUrl5: "",
      imageUrl6: "",
      productQuantity: "",
      productDiscount: "",
      productPrice: "",
    });

    function handle(e){
      const newData={...productData}
      newData[e.target.id]=e.target.value
      setProductData(newData)
      console.log(newData)
    }

    function handleSubmit(e){
      e.preventDefault();
      axios.post(productUrl,{
        productId:productData.productId,
        productName: productData.productName,
        productDesc: productData.productDesc,
        productTag: productData.productTag,
        imageUrl1: productData.imageUrl1,
        imageUrl2: productData.imageUrl2,
        imageUrl3: productData.imageUrl3,
        imageUrl4: productData.imageUrl4,
        imageUrl5: productData.imageUrl5,
        imageUrl6: productData.imageUrl6,
        productQuantity: parseInt(productData.productQuantity),
        productDiscount: parseFloat(productData.productDiscount).toFixed(2),
        categoryId:parseInt(categoryId),
        productPrice: parseFloat(productData.productPrice).toFixed(2), //parseInt(productData.productPrice)
        sizesExist : sizesExist
      },{
        headers: {
          Authorization: `Bearer ${Auth.getAccessToken()}`,
        }
      } 
      )
      .then(res=>{
        console.log(res)
        //console.log(res.productData)
      }).catch(err=>{
        console.log(err)
      })
    }
    //post product end

    //console logs
    console.log(category);
    console.log(sizesExist);
    console.log(categoryId);


    //for expanding 
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
         setExpanded(!expanded);
         setSizeExist(!expanded);
    };



    return(
      <>
      <div className={classes.formContainer}>
        <div>
            <h3 style={{color:"#1976D2",textAlign:"center"}}>Add Product</h3>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container alignItems="center" columnSpacing={2} className={classes.gridStyle} >
            <Grid item
              xs={7.3}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}>
                <Box >
                 <TextField  
                    className={classes.gridContent}
                    onChange={(e) => handle(e)}
                    id="productId"
                    value={productData.productId}
                    size="small" 
                    label="Product Id" 
                    type="number" 
                    InputLabelProps={{ shrink: true,}}/>
                </Box><br/>
                <Box>      
                  <TextField className={classes.gridContent} 
                     onChange={(e) => handle(e)}
                     id="productName"
                     value={productData.productName}
                     size="small" 
                     label="Product Name" 
                     placeholder="Enter Product name" />
                </Box><br/>
                 <Box>             
                   <TextField className={classes.gridContent}
                      onChange={(e) => handle(e)}
                      id="productTag"
                      value={productData.productTag} 
                      size="small" 
                      label="Product Tag" 
                      placeholder="Enter Product tag" />
                  </Box><br/>
                <Box>              
                  <TextField className={classes.gridContent} 
                     onChange={(e) => handle(e)}
                     id="productQuantity"
                     value={productData.productQuantity}
                     size="small" 
                     label="Product Quantity" 
                     type="number" 
                      placeholder="1" 
                    InputLabelProps={{ shrink: true,}}/>
                </Box><br/>

                <Box >
                  <TextField className={classes.gridContent}
                      onChange={(e) => handle(e)}
                      id="productDiscount"
                      value={productData.productDiscount}
                      size="small" 
                      label="Product Discount" 
                      type="number" 
                      placeholder="25" 
                      InputLabelProps={{ shrink: true,}}/>
                </Box><br/>
                <Box>
                  <TextField className={classes.gridContent}
                    onChange={(e) => handle(e)}
                    id="productPrice"
                    value={productData.productPrice}
                    size="small" 
                    type='number'
                    label="Product Price" 
                    placeholder="Enter Product price" />
                </Box><br/>
            </Grid>
            <Grid item
              xs={2}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}>
                <Box>             
                  <TextField className={classes.gridContent} 
                    onChange={(e) => handle(e)}
                    id="imageUrl1"
                    value={productData.imageUrl1}
                    size="small" 
                   label="Product Image URL1" 
                   placeholder="Product Image URL1" />
               </Box><br/>
               <Box>             
                 <TextField className={classes.gridContent} 
                  onChange={(e) => handle(e)}
                  id="imageUrl2"
                  value={productData.imageUrl2}
                  size="small" 
                  label="Product Image URL2" 
                  placeholder="Product Image URL2" />
              </Box><br/>
              <Box>             
                 <TextField className={classes.gridContent} 
                   onChange={(e) => handle(e)}
                   id="imageUrl3"
                   value={productData.imageUrl3}
                   size="small" 
                   label="Product Image URL3" 
                   placeholder="Product Image URL3" />
              </Box><br/>
              <Box>             
                 <TextField className={classes.gridContent} 
                   onChange={(e) => handle(e)}
                   id="imageUrl4"
                   value={productData.imageUrl4}
                   size="small" 
                   label="Product Image URL4" 
                   placeholder="Product Image URL1" />
              </Box><br/>
              <Box>             
                  <TextField className={classes.gridContent} 
                    onChange={(e) => handle(e)}
                    id="imageUrl5"
                    value={productData.imageUrl5}
                    size="small" 
                   label="Product Image URL5" 
                   placeholder="Product Image URL1" />
              </Box><br/>
              <Box>             
                <TextField className={classes.gridContent}
                   onChange={(e) => handle(e)}
                   id="imageUrl6"
                   value={productData.imageUrl6}
                   size="small" 
                   label="Product Image URL6" 
                   placeholder="Product Image URL1" />
              </Box><br/>
            </Grid>
            <Grid item
              xs={7.3}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",}}>
              <Box>              
                 <TextField className={classes.gridContent} 
                   onChange={(e) => handle(e)}
                   id="productDesc"
                   value={productData.productDesc}
                   multiline rows={2} 
                   label="Product Description" 
                   placeholder="Enter Product description" />
            </Box><br/>
          </Grid>
          <Grid item
              xs={2}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}>
               <Box> 
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
                    <Select labelId="demo-simple-select-label" 
                       label="Product Category" 
                       className={classes.gridContent} 
                       onChange={(e)=>setCategoryId(e.target.value)} >
                        {category?.map((item) => {
                           return (
                              <MenuItem key={item.categoryName} value={item.categoryId}>
                               {item.categoryName}
                              </MenuItem>
                           );
                        })}
                     </Select>          
                  </FormControl>
                </Box><br/>
            </Grid>
            <Grid item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}>
              <div>
                 <label> Different Sizes:  </label>
                  <ExpandMore
                   expand={expanded}
                   onClick={handleExpandClick}
                   aria-expanded={expanded}
                   aria-label="show more">
                 </ExpandMore>     
              </div>
              <br/>
             <Button type="submit" size="big"  variant="contained">
                 Add Product
             </Button>
            </Grid>
          </Grid>
        </form>
        <br/>
        <br/>
     </div>
        <br/>
        <div >
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Button component={Link} to="/addProduct/addSize">
            Add Size
          </Button>
          {/* <SizesInput /> */}
        </Collapse>
        </div>
     </>
    );
}

export default AddProduct;