import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { useState, useEffect } from "react";
import { getAuthorizationHeader } from "../utilities";
import Auth from "../Auth/Auth";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import Notification from "./Notification";
import UploadFile from "./UploadFile";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <Checkbox {...other} />;
})(({ theme, expand }) => ({
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));


//Component for Adding product 

function AddProduct() {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //to set sizesExist from checkbox
  const [sizesExist, setSizeExist] = useState(false);

  //to get and set categoryId from dropdown list
  const [categoryId, setCategoryId] = useState("");

  //to fetch catgory in dropdown list
  const categoryUrl = "https://localhost:44314/api/Categories";
  const [category, setCategory] = useState([]);
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
  const [url5, setUrl5] = useState("");
  const [url6, setUrl6] = useState("");

  useEffect(() => {
    axios.get(categoryUrl, getAuthorizationHeader()).then((response) => {
      setCategory(response.data);
    });
  }, [categoryUrl]);
  //category fetch end

  //to set new generated product id after adding the product
  const [newProductId, setNewProductId] = useState("");

  //to post product
  const productUrl = "https://localhost:44314/api/Products";
  const [productData, setProductData] = useState({
    productId: "",
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

  function handle(e) {
    const newData = { ...productData };
    newData[e.target.id] = e.target.value;
    setProductData(newData);
    console.log(newData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        productUrl,
        {
          productId: productData.productId,
          productName: productData.productName,
          productDesc: productData.productDesc,
          productTag: productData.productTag,
          imageUrl1: url1,
          imageUrl2: url2,
          imageUrl3: url3,
          imageUrl4: url4,
          imageUrl5: url5,
          imageUrl6: url6,
          productQuantity: parseInt(productData.productQuantity),
          productDiscount: parseFloat(productData.productDiscount).toFixed(2),
          categoryId: parseInt(categoryId),
          productPrice: parseFloat(productData.productPrice).toFixed(2),
          sizesExist: sizesExist,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getAccessToken()}`,
          },
        }
      )
      .then((res) => {
        res.status === 201
          ? setNotify({
              isOpen: true,
              message: "Product was added successfully",
              type: "success",
            })
          : setNotify({
              isOpen: true,
              message: "Error was encountered",
              type: "error",
            });
        setNewProductId(res.data.productId);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //post product end

  console.log(newProductId);

  //post size
  const sizeUrl = "https://localhost:44314/api/Sizes/CreateSize";
  const [sizeData, setSizeData] = useState({
    productId: newProductId,
    sizeName: "",
    sizePrice: "",
  });

  function handleSize(e) {
    const newData = { ...sizeData };
    newData[e.target.id] = e.target.value;
    setSizeData(newData);
    console.log(newData);
  }

  function handleSizeSubmit(e) {
    e.preventDefault();
    console.log(newProductId);
    axios
      .post(
        sizeUrl,
        {
          productId: newProductId,
          sizeName: sizeData.sizeName,
          sizePrice: sizeData.sizePrice,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.getAccessToken()}`,
          },
        }
      )
      .then((res) => {
        res.status === 201
          ? setNotify({
              isOpen: true,
              message: "Size added successfully",
              type: "success",
            })
          : setNotify({
              isOpen: true,
              message: "Error was encountered",
              type: "error",
            });
        setSizeData({
          productId: newProductId,
          sizeName: "",
          sizePrice: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //post size end

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

  return (
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
              placeholder="Enter Product tag"
            />
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
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="standard"
              onChange={(e) => handle(e)}
              id="productDiscount"
              value={productData.productDiscount}
              size="small"
              label="Product Discount(in %)"
              type="number"
              placeholder="0-100"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Product Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                sx={{ width: "25vh" }}
                label="Product Category"
                fullWidth
                variant="standard"
                onChange={(e) => setCategoryId(e.target.value)}
              >
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
            <TextField
              fullWidth
              variant="standard"
              onChange={(e) => handle(e)}
              id="productPrice"
              value={productData.productPrice}
              size="small"
              type="number"
              label="Product Price"
              placeholder="Enter Product price"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="standard"
              onChange={(e) => handle(e)}
              id="productDesc"
              value={productData.productDesc}
              multiline
              rows={2}
              label="Product Description"
              placeholder="Enter Product description"
            />
          </Grid>

          <Grid item xs={12}>
            <div>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              ></ExpandMore>{" "}
              <label>Product has different sizes</label>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" size="medium" variant="contained">
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
      <br />

      <div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <form onSubmit={(e) => handleSizeSubmit(e)}>
            <Typography variant="p" gutterBottom>
              Size Details
            </Typography>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="standard"
                  onChange={(e) => handleSize(e)}
                  id="sizeName"
                  value={sizeData.sizeName}
                  size="small"
                  label="Size Name"
                  placeholder="Enter Size name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="standard"
                  onChange={(e) => handleSize(e)}
                  id="sizePrice"
                  value={sizeData.sizePrice}
                  size="small"
                  label="Size Price"
                  type="number"
                  placeholder="Enter size price"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" size="small" variant="contained">
                  Add Size
                </Button>
              </Grid>
              <br />
            </Grid>
          </form>
        </Collapse>
      </div>
      <br />

      <Grid container justifyContent={"center"} direction={"column"}>
        <Grid item>
          <Typography style={{ color: "red" }}>
            Kindly upload images below before clicking the add product button
          </Typography>
          <Typography>Image 1</Typography>
          <UploadFile url={url1} setUrl={setUrl1} />
        </Grid>
        <Grid item xs={12}>
          <Typography>Image 2</Typography>
          <UploadFile url={url2} setUrl={setUrl2} />
        </Grid>
        <Grid item>
          <Typography>Image 3</Typography>
          <UploadFile url={url3} setUrl={setUrl3} />
        </Grid>
        <Grid item>
          <Typography>Image 4</Typography>
          <UploadFile url={url4} setUrl={setUrl4} />
        </Grid>
        <Grid item>
          <Typography>Image 5</Typography>
          <UploadFile url={url5} setUrl={setUrl5} />
        </Grid>
        <Grid item>
          <Typography>Image 6</Typography>
          <UploadFile url={url6} setUrl={setUrl6} />
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </React.Fragment>
  );
}

export default AddProduct;
