import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button} from "@material-ui/core";
import { useNavigate } from "react-router";
import axios, { Axios } from 'axios';
import {useState} from 'react';
import Auth from "../Auth/Auth"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    form : {
    padding:10,
  },
}));

function AddCategory() {

    const classes = useStyles();

    const navigate = useNavigate();

    const categoryUrl='https://localhost:7157/api/Categories';
    const[categoryData,setCategoryData]=useState({
      categoryName: "",
    });

    function handle(e){
      const newData={...categoryData}
      newData[e.target.id]=e.target.value
      setCategoryData(newData)
      console.log(newData)
    }

    function handleSubmit(e){
      e.preventDefault();
      axios.post(categoryUrl,{
        categoryName: categoryData.categoryName,
        
      },{
        headers: {
          Authorization: `Bearer ${Auth.getAccessToken()}`,
        }
      } 
      )
      .then(res=>{
        console.log(res.categoryData)
      }).catch(err=>{
        console.log(err)
      })
    }

  return (
    <>
    <div className={classes.Box}>
      <div>
        <h3>Add Category</h3>
      </div>
      
    <form onSubmit={(e) => handleSubmit(e)}>
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <div>
      <TextField
        onChange={(e) => handle(e)}
        required
        id="outlined-required"
        label="Required"
        //defaultValue="Category Name"
      />
    </div>
    </Box>
    <br/>
    <div>
    <Button type="submit" size="small" variant="contained" color="inherit" onClick={()=>{navigate("/categories")}}>Save</Button>
    </div>
    
    </form>
  </div>
  </>
  );
}

export default AddCategory;