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
import Notification from './Notification';
import {Grid} from "@material-ui/core";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

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


    const[notify,setNotify] = useState({isOpen:false,message:'',type:''});
    

    function handle(e){
      const { name , value } = e.target;
      const newData={
        ...categoryData,
      [name] : value
      }
      
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
        res.status === 201 ? (setNotify({
          isOpen:true,
          message:'Operation successful',
          type:'success'
        } ) ) : (setNotify({
          isOpen:true,
          message:'Error Encountered, check logs for more information',
          type:'error'
        } ) ) 
      }).catch(err=>{
        console.log(err)
      })
    }

  return (
    <>
    <Grid
     spacing={0}
     direction="row"
     alignItems="center"
     justify="center">
      <Grid item xs={6}>
    <div className={classes.Box}>
      <div>
        <h3 >Add Category</h3>
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
    <Button type="submit" size="small" variant="contained" color="inherit" style={{ color: "white",backgroundColor:"#379bff" }}
    // onClick={()=>{navigate("/categories")}}
    >Save</Button>
    <Button onClick={()=>navigate('/Categories')} style={{color:"white",backgroundColor:"#379bff",padding:"5px"}}>Back to categories page</Button>
    </div>    
    
    </form>
    <Notification 
    notify={notify} 
    setNotify={setNotify}
    />
  </div>
  </Grid>
  <Grid item xs={6}>
     
  </Grid>
  </Grid>
 
  </>
  );
}

export default AddCategory;