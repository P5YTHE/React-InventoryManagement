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


const useStyles = makeStyles((theme) => ({
    form: {
      padding:100,
    },
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
      //for expanding to fill size form
    // const ExpandMore = styled((props) => {
    //  const { expand, ...other } = props;
    //     return <Switch onChange={(e)=>setSizeExist(e.target.checked)} id="sizesExist" ></Switch>;
    //     })(({ theme, expand }) => ({
    //     transition: theme.transitions.create('transform', {
    //     duration: theme.transitions.duration.shortest,
    //  }),
    // }));
    
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
        console.log(res.productData)
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


    //for repeating size 
    // const sizeUrl='https://localhost:7177/api/Sizes/CreateSize'; 
    // const blankSize = { sizeName: '', sizePrice: '' };
    // const [sizeState, setSizeState] = useState([
    //     { ...blankSize },
    // ]);

    // const addSize = () => {
    //     setSizeState([...sizeState, { ...blankSize }]);
    // };

    // function handleSizeSubmit(e){
    //   e.preventDefault();
    //   axios.post(sizeUrl,{
    //     productId:productData.productId,
    //     sizeName:sizeState.sizeName,
    //     sizePrice:sizeState.sizePrice
    //   },{
    //     headers: {
    //       Authorization: `Bearer ${Auth.getAccessToken()}`,
    //     }
    //   } 
    //   )
    //   .then(res=>{
    //     console.log(res.sizeState)
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    // }

    // const handleSizeChange = (e) => {
    //     const updatedSize = [...sizeState];
    //     updatedSize[e.target.dataset.idx][e.target.className] = e.target.value;
    //     setSizeState(updatedSize);
    // };
    // //repeat size end


    return(
        <>
        <div className={classes.form}>
        <div>
            <h3>Add Product</h3>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
        <Box >
              <TextField sx={{ width: "45ch" }} 
                    onChange={(e) => handle(e)}
                    id="productId"
                    value={productData.productId}
                    size="small" 
                    label="Product Id" 
                    type="number" 
                    InputLabelProps={{ shrink: true,}}/>
        </Box><br/>
        <Box>      
              <TextField sx={{ width: "45ch" }} 
                onChange={(e) => handle(e)}
                id="productName"
                value={productData.productName}
                size="small" 
                label="Product Name" 
                placeholder="Enter Product name" />
        </Box><br/>

        <Box>              
              <TextField sx={{ width: "45ch" }} 
                onChange={(e) => handle(e)}
                id="productDesc"
                value={productData.productDesc}
                multiline rows={3} 
                label="Product Description" 
                placeholder="Enter Product description" />
        </Box><br/>

        <Box>             
              <TextField sx={{ width: "45ch" }}
                onChange={(e) => handle(e)}
                id="productTag"
                value={productData.productTag} 
                size="small" 
                label="Product Tag" 
                placeholder="Enter Product tag" />
        </Box><br/>

        <Box>             
              <TextField sx={{ width: "45ch" }} 
                onChange={(e) => handle(e)}
                id="imageUrl1"
                value={productData.imageUrl1}
                size="small" 
                label="Product Image URL1" 
                placeholder="Product Image URL1" />
        </Box><br/>
        <Box>             
              <TextField sx={{ width: "45ch" }} 
                onChange={(e) => handle(e)}
                id="imageUrl2"
                value={productData.imageUrl2}
                size="small" 
                label="Product Image URL2" 
                placeholder="Product Image URL1" />
        </Box><br/>
        <Box>             
              <TextField sx={{ width: "45ch" }} 
                onChange={(e) => handle(e)}
                id="imageUrl3"
                value={productData.imageUrl3}
                size="small" 
                label="Product Image URL3" 
                placeholder="Product Image URL1" />
        </Box><br/>
        <Box>             
              <TextField sx={{ width: "45ch" }} 
                onChange={(e) => handle(e)}
                id="imageUrl4"
                value={productData.imageUrl4}
                size="small" 
                label="Product Image URL4" 
                placeholder="Product Image URL1" />
        </Box><br/>
        <Box>             
              <TextField sx={{ width: "45ch" }} 
                onChange={(e) => handle(e)}
                id="imageUrl5"
                value={productData.imageUrl5}
                size="small" 
                label="Product Image URL5" 
                placeholder="Product Image URL1" />
        </Box><br/>
        <Box>             
              <TextField sx={{ width: "45ch" }} 
                onChange={(e) => handle(e)}
                id="imageUrl6"
                value={productData.imageUrl6}
                size="small" 
                label="Product Image URL6" 
                placeholder="Product Image URL1" />
        </Box><br/>

        <Box>              
              <TextField sx={{ width: "45ch" }} 
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
              <TextField sx={{ width: "45ch" }} 
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
            <FormControl>
            <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
            <Select labelId="demo-simple-select-label" 
               label="Product Category" 
               sx={{ width: "45ch" }} 
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

        <div>
        <label>Different Sizes:  </label>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
        </ExpandMore>     
        </div>

        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>   

          
          <br/>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={addSize}>
                   Add Size
            </Button>
            <br/>
            <br/>
            {
                sizeState.map((val, idx) => (
                    <SizeInputs
                        key={`size-${idx}`}
                        idx={idx}
                        sizeState={sizeState}
                        handleSizeChange={handleSizeChange}
                    />
                ))
            }
        </Collapse> */}

        <Box>
           <TextField sx={{ width: "45ch" }} 
               onChange={(e) => handle(e)}
               id="productPrice"
               value={productData.productPrice}
               size="small" 
               type='number'
               label="Product Price" 
               placeholder="Enter Product price" />
        </Box><br/>
        
        {/* <Box>
          <Switch onChange={(e)=>setSizeExist(e.target.checked)} id="sizesExist" ></Switch>
        </Box> */}

        <Button type="submit" size="big"  variant="contained">
                Add Product
        </Button>
        </form>
        <br/>
        <br/>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <SizesInput/>
        </Collapse>

        </div>
     </>
    );
}

export default AddProduct;