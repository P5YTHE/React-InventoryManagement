import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//Component for Error Page
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div id="wrapper" align="center">
        <img src="https://i.ibb.co/0qmqM9N/image-2022-01-18-100645.jpg" />
        <div id="info">
          <h3>The url is not a valid URL</h3>
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

export default NotFoundPage;
