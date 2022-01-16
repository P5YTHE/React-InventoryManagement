import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button} from "@material-ui/core";
import { useNavigate } from "react-router";
import axios, { Axios } from 'axios';
import {useState} from 'react';
import Auth from "../Auth/Auth"
import { makeStyles } from "@material-ui/core/styles";
import { getAuthorizationHeader } from '../utilities'

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
      const { name , value } = e.target;
      const newData={
        ...categoryData,
      [name] : value
      }
      // newData[e.target.id]=e.target.value
      setCategoryData(newData)
      console.log(newData)
    }

    function handleSubmit(e){
      e.preventDefault();
      axios.post(categoryUrl,{
        categoryName: categoryData.categoryName,
        
      },getAuthorizationHeader()
      // {
      //   headers: {
      //     Authorization: `Bearer ${Auth.getAccessToken()}`,
      //   }
      // } 
      )
      .then(res=>{
        console.log(res)
        res.status === 201 ? (navigate('/categories')) : ( navigate('/error'))
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
      
    <form onSubmit={handleSubmit}>
    {/* <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  > */}
    <div>
      <TextField
        onChange={(e) => handle(e)}
        required
        name="categoryName"
        label="Category Name"
        value={categoryData.categoryName}
      />
    </div>
    {/* </Box> */}
    <br/>
    <div>
    <Button type="submit" size="small" variant="contained" color="inherit"
    // onClick={()=>{navigate("/categories")}}
    >Save</Button>
    </div>
    
    </form>
  </div>
  </>
  );
}

export default AddCategory;