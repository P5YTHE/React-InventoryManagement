import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { getAuthorizationHeader } from "../utilities";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
let imageUrl1 = "";
let imageUrl2 = "";
let imageUrl3 = "";
let imageUrl4 = "";
let imageUrl5 = "";
let imageUrl6 = "";
let hasSizes = false;
let productKey = "";


//Component for rendering sizes and their prices
const SizesPart = () => {
  const url = "https://localhost:44314/api/Sizes/GetSizes";
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    axios.get(url, getAuthorizationHeader()).then((response) => {
      setSizes(response.data);
    });
  }, [url]);

  const filteredSizes = sizes.filter((size) => {
    if (size.productId == productKey) {
      return size;
    }
  });

  const displaySizes = filteredSizes.map((size) => {
    return (
      <TableRow style={{backgroundColor:"#DCD4D2"}}>
        <TableCell align="left">{size.sizeName}</TableCell>
        <TableCell align="left">{size.sizePrice}</TableCell>
      </TableRow>
    );
  });

  if (hasSizes) {
    return (
      <>
        <TableRow style={{backgroundColor:"#DCD4D2"}}>
          <TableCell align="left">
            Size
          </TableCell>
          <TableCell align="left">Price</TableCell>
        </TableRow>
        {displaySizes}
      </>
    );
    console.log(productKey);
    console.log(displaySizes);
  } else {
    return <></>;
  }
};


//Stepper function for images
function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const images = [];
  if (
    imageUrl1 &&
    imageUrl1 != null &&
    imageUrl1 != "" &&
    imageUrl1.length != 0
  ) {
    images.push({ label: "1", imgPath: imageUrl1 });
  }
  if (
    imageUrl2 &&
    imageUrl2 != null &&
    imageUrl2 != "" &&
    imageUrl2.length != 0
  ) {
    images.push({ label: "2", imgPath: imageUrl2 });
  }
  if (
    imageUrl3 &&
    imageUrl3 != null &&
    imageUrl3 != "" &&
    imageUrl3.length != 0
  ) {
    images.push({ label: "3", imgPath: imageUrl3 });
  }
  if (
    imageUrl4 &&
    imageUrl4 != null &&
    imageUrl4 != "" &&
    imageUrl4.length != 0
  ) {
    images.push({ label: "4", imgPath: imageUrl4 });
  }
  if (
    imageUrl5 &&
    imageUrl5 != null &&
    imageUrl5 != "" &&
    imageUrl5.length != 0
  ) {
    images.push({ label: "5", imgPath: imageUrl5 });
  }
  if (
    imageUrl6 &&
    imageUrl6 != null &&
    imageUrl6 != "" &&
    imageUrl6.length != 0
  ) {
    images.push({ label: "6", imgPath: imageUrl6 });
  }

  const maxSteps = images.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      {images && (
        <Box sx={{ maxWidth: 600, flexGrow: 1 }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              height: 50,
              pl: 2,
              bgcolor: "background.default",
            }}
          >
            {}
          </Paper>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: 400,
                      display: "block",
                      maxWidth: 600,
                      overflow: "scroll",
                      width: "100%",
                    }}
                    src={step.imgPath}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={<></>}
            backButton={<></>}
          />
        </Box>
      )}
    </>
  );
}

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});


//Component for Viewing Single Product Details
const ViewSingleProduct = (props) => {
  const product = props.productObj;
  imageUrl1 = product.imageUrl1;
  imageUrl2 = product.imageUrl2;
  imageUrl3 = product.imageUrl3;
  imageUrl4 = product.imageUrl4;
  imageUrl5 = product.imageUrl5;
  imageUrl6 = product.imageUrl6;
  hasSizes = product.sizesExist;
  productKey = product.productId;

  return (
    <Paper sx={{ p: 1, maxWidth: "100%", flexGrow: 2 }}>
      <Grid container spacing={5} justifyContent={"center"}>
        <Grid item>
          <SwipeableTextMobileStepper />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={5}>
            <Grid item xs spacing={2}>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: "100%", maxWidth: "50%", padding: "10px" }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Product Id</TableCell>
                      <TableCell align="left">{product.productId}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">Product Name</TableCell>
                      <TableCell align="left">{product.productName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Product Description</TableCell>
                      <TableCell align="left">{product.productDesc}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Product Tag</TableCell>
                      <TableCell align="left">{product.productTag}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Product Quantity</TableCell>
                      <TableCell align="left">
                        {product.productQuantity}
                      </TableCell>
                    </TableRow>
                    {product.sizesExist ? (
                      <></>
                    ) : (
                      <>
                        <TableRow>
                          <TableCell align="left">Product Price</TableCell>
                          <TableCell align="left">
                            {product.productPrice}
                          </TableCell>
                        </TableRow>
                      </>
                    )}

                    <TableRow>
                      <TableCell align="left">Product Discount</TableCell>
                      <TableCell align="left">{`${product.productDiscount}%`}</TableCell>
                    </TableRow>
                    <SizesPart />
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ViewSingleProduct;
