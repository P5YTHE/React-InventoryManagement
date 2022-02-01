import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getAuthorizationHeader } from "../utilities";
import Notification from "./Notification";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  GridStyles: {
    justify: "center",
    spacing: 0,
    direction: "row",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  gridContent: {
    width: "50vh",
    margin: "0px",
  },
}));


//Component for Adding category djkdj
function AddCategory() {
  const classes = useStyles();

  const navigate = useNavigate();

  const categoryUrl = "https://localhost:7157/api/Categories";
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  function handle(e) {
    const { name, value } = e.target;
    const newData = {
      ...categoryData,
      [name]: value,
    };

    setCategoryData(newData);
    console.log(newData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        categoryUrl,
        {
          categoryName: categoryData.categoryName,
        },
        getAuthorizationHeader()
      )
      .then((res) => {
        res.status === 201
          ? setNotify({
              isOpen: true,
              message: "Operation successful",
              type: "success",
            })
          : setNotify({
              isOpen: true,
              message: "Error Encountered, check logs for more information",
              type: "error",
            });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Grid className={classes.GridStyles}>
        <Grid>
          <div>
            <div>
              <h3>ADD CATEGORY</h3>
            </div>
            <br />
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  className={classes.gridContent}
                  onChange={(e) => handle(e)}
                  required
                  name="categoryName"
                  label="Category Name"
                  value={categoryData.categoryName}
                />
              </div>

              <br />
              <br />
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="inherit"
                  style={{ color: "white", backgroundColor: "#379bff" }}
                >
                  Save
                </Button>
              </div>
              <br />
              <div>
                <Button
                  onClick={() => navigate("/Categories")}
                  style={{ color: "white", backgroundColor: "#379bff" }}
                >
                  Back to categories page
                </Button>
              </div>
            </form>

            <Notification notify={notify} setNotify={setNotify} />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default AddCategory;
