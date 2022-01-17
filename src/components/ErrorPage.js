import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//Component for Error Page
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div id="wrapper" align="center">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/002/307/289/small/exclamation-mark-symbol-warning-dangerous-icon-on-white-background-free-vector.jpg" />
        <div id="info">
          <h3>You have encountered an error!</h3>
        </div>
        <div align="center">
          <Button
            variant="contained"
            color="#379bff"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
          >
            Back
          </Button>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
