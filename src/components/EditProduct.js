import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getAuthorizationHeader } from '../utilities';
import Auth from "../Auth/Auth";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from "@mui/material/FormControl";
import { useParams } from 'react-router-dom';
import Notification from './Notification'

const theme = createTheme();


//Component for Editing Products
function EditProducts() {

  let { id } = useParams();
  console.log(id);

  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  //to set sizesExist from toggle/switct button
  const [sizesExist, setSizeExist] = useState(false);

  //to get and set categoryId from dropdown list
  const [categoryId, setCategoryId] = useState('');

  //to fetch catgory in dropdown list
  const categoryUrl = 'https://localhost:7157/api/Categories';
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get(categoryUrl, getAuthorizationHeader()).then(response => {
      setCategory(response.data);
    })
  }, [categoryUrl]);
  //category fetch end

  const [newProductId, setNewProductId] = useState('');

  //to post product
  const productGetUrl = 'https://localhost:7075/api/Products/';
  const productPutUrl = 'https://localhost:7075/api/Products/';
  const [productData, setProductData] = useState({
    productId: "",
    merchantId: "",
    productName: "",
    productDesc: "",
    productTag: "",
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
    imageUrl4: "",
    imageUrl5: "",
    imageUrl6: "",
    categoryId: "",
    productQuantity: "",
    productDiscount: "",
    productPrice: "",
    sizesExist: "",
  });

  useEffect(() => {
    console.log("get api called");
    axios.get(productGetUrl + id, getAuthorizationHeader()).then(response => {
      setProductData(response.data);
    })
  }, [productGetUrl]);

  function handle(e) {
    const newData = { ...productData }
    newData[e.target.id] = e.target.value
    setProductData(newData)
    console.log(newData)
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.put(productPutUrl + id, {
      productId: productData.productId,
      merchantId: productData.merchantId,
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
      categoryId: parseInt(categoryId),
      productPrice: parseFloat(productData.productPrice).toFixed(2), //parseInt(productData.productPrice)
      sizesExist: productData.sizesExist
    }, {
      headers: {
        Authorization: `Bearer ${Auth.getAccessToken()}`,
      }
    }
    )
      .then((res) => res.status === 204 ? (setNotify({
        isOpen: true,
        message: 'Product Updated!',
        type: 'success'
      })) : (setNotify({
        isOpen: true,
        message: 'Error was encountered',
        type: 'error'
      }))
      ).catch(err => {
        console.log(err)
      })
  }



  //post size end

  //console logs
  console.log(category);
  console.log(sizesExist);
  console.log(categoryId);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Edit Product
          </Typography>
          <br />
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Product Details
            </Typography>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    fullWidth
                    onChange={(e) => handle(e)}
                    id="productName"
                    value={productData.productName}
                    size="small"
                    label="Product Name"
                    placeholder="Enter Product name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="standard"
                    onChange={(e) => handle(e)}
                    id="productTag"
                    value={productData.productTag}
                    label="Product Tag"
                    placeholder="Enter Product tag" />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    variant="standard"
                    onChange={(e) => handle(e)}
                    id="productQuantity"
                    value={productData.productQuantity}
                    size="small"
                    label="Product Quantity"
                    type="number"
                    placeholder="1"
                    InputLabelProps={{ shrink: true, }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth
                    variant="standard"
                    onChange={(e) => handle(e)}
                    id="productDiscount"
                    value={productData.productDiscount}
                    size="small"
                    label="Product Discount"
                    type="number"
                    placeholder="25"
                    InputLabelProps={{ shrink: true, }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth
                    variant="standard"
                    onChange={(e) => handle(e)}
                    id="imageUrl1"
                    value={productData.imageUrl1}
                    size="small"
                    label="Product Image URL1"
                    placeholder="Product Image URL1" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth
                    variant="standard"
                    onChange={(e) => handle(e)}
                    id="imageUrl2"
                    value={productData.imageUrl2}
                    size="small"
                    label="Product Image URL2"
                    placeholder="Product Image URL2" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth
                    variant="standard"
                    onChange={(e) => handle(e)}
                    id="imageUrl3"
                    value={productData.imageUrl3}
                    size="small"
                    label="Product Image URL3"
                    placeholder="Product Image URL3" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth
                    variant="standard"
                    onChange={(e) => handle(e)}
                    id="imageUrl4"
                    value={productData.imageUrl4}
                    size="small"
                    label="Product Image URL4"
                    placeholder="Product Image URL4" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth
                    variant="standard"
                    onChange={(e) => handle(e)}
                    id="imageUrl5"
                    value={productData.imageUrl5}
                    size="small"
                    label="Product Image URL5"
                    placeholder="Product Image URL5" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth
                    variant="standard"
                    onChange={(e) => handle(e)}
                    id="imageUrl6"
                    value={productData.imageUrl6}
                    size="small"
                    label="Product Image URL6"
                    placeholder="Product Image URL6" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
                    <Select labelId="demo-simple-select-label"
                      sx={{ width: "38vh" }}
                      label="Product Category"
                      fullWidth
                      variant="standard"
                      value={productData.categoryName}
                      onChange={(e) => setCategoryId(e.target.value)} >
                      {category?.map((item) => {
                        return (
                          <MenuItem key={item.categoryName} value={item.categoryId}>
                            {item.categoryName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth
                    variant="standard"
                    onChange={(e) => handle(e)}
                    id="productPrice"
                    value={productData.productPrice}
                    size="small"
                    type='number'
                    label="Product Price"
                    placeholder="Enter Product price" />
                </Grid>


                <Grid item xs={12}>
                  <TextField fullWidth
                    variant="standard"
                    onChange={(e) => handle(e)}
                    id="productDesc"
                    value={productData.productDesc}
                    multiline rows={2}
                    label="Product Description"
                    placeholder="Enter Product description" />
                </Grid>

                
                <Grid item xs={12} align="center">
                  <Button type="submit" size="medium" variant="contained">
                    Update
                  </Button>

                </Grid>
              </Grid>
            </form>
            <Notification
              notify={notify}
              setNotify={setNotify}
            />

          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default EditProducts;