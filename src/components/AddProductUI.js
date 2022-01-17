import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddProduct from "./AddProduct";
import DescriptionIcon from "@mui/icons-material/Description";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CreateIcon from "@mui/icons-material/Create";

const steps = ["Add Product", "Add Size"];

//stepper component
function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddProduct />;
    case 1:
      return (
        <React.Fragment>
          <Typography variant="h5" gutterBottom>
            Thank you for your time.
          </Typography>
          <Typography variant="subtitle1">
            Your product has been successfully added!
          </Typography>
        </React.Fragment>
      );
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});


//Component for add product form
export default function Checkout() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          <DescriptionIcon fontSize="small" /> Steps
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Steps to add the product"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Typography>
                <Typography variant="p" style={{ color: "#444444" }}>
                  <CreateIcon fontSize="small" />
                  Add Product
                </Typography>
                <p style={{ color: "#585858" }}>
                  1.Fill the details <br />
                  2.Upload product pictures
                  <br />
                  3.Click on Add Product button
                  <br />
                  4.If product has more sizes select checkbox and follow the
                  steps below
                </p>
                <br />
                <Typography variant="p" style={{ color: "#444444" }}>
                  <CreateIcon fontSize="small" />
                  Add Size
                </Typography>
                <p style={{ color: "#585858" }}>
                  1.Follow the steps above to Add Product first and click Add
                  Product
                  <br />
                  2.Size details form will appear
                  <br />
                  3.Fill size details
                  <br />
                  4.Click Add Size
                  <br />
                  5.Click Confirm to finish
                </p>
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Product Form
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your time.
                </Typography>
                <Typography variant="subtitle1">
                  Your product has been successfully added!
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length ? "" : "Confirm"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
