import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { getAuthorizationHeader } from '../utilities';
import Auth from "../Auth/Auth";
import Grid from '@mui/material/Grid';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "50%",
    alignItems: "center",
    borderRadius: "50px",
    marginLeft:"300px",
    border: "2.5px solid #1976D2 ",
    justifyContent: "center",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  gridContent: {
    width: "60vh",
    margin: "0px",
  },
  gridStyle:{
    border: "3px",
  }
  }));

function SizesInput(){
    const classes=useStyles();
    
    const sizeUrl='https://localhost:7177/api/Sizes/CreateSize';
    const[sizeData,setSizeData]=useState({
        productId:"",
        sizeName:"",
        sizePrice:""
    })

    function handleSize(e){
        const newData={...sizeData}
        newData[e.target.id]=e.target.value
        setSizeData(newData)
        console.log(newData)
      }

      function handleSizeSubmit(e){
        e.preventDefault();
        axios.post(sizeUrl,{
          productId:sizeData.productId,
          sizeName:sizeData.sizeName,
          sizePrice:sizeData.sizePrice
        },{
          headers: {
            Authorization: `Bearer ${Auth.getAccessToken()}`,
          }
        } 
        )
        .then(res=>{
          console.log(res.sizeData)
        }).catch(err=>{
          console.log(err)
        })
      }


    return(
        <>
        <div className={classes.formContainer}>
        <br/>
        <form onSubmit={(e) => handleSizeSubmit(e)}>
           <Grid container alignItems="center" columnSpacing={2}>
             <Grid item
                  xs={12}
                 style={{
                 display: "flex",
                 justifyContent: "center",
                 alignItems: "center",
                 flexDirection: "column",
              }}>
                <Box >
                  <TextField className={classes.gridContent}
                    onChange={(e) => handleSize(e)}
                    id="productId"
                    value={sizeData.productId}
                    size="small" 
                    label="Product Id" 
                    type="number" 
                    InputLabelProps={{ shrink: true,}}/>
                </Box><br/>
                <Box>      
                  <TextField className={classes.gridContent}
                   onChange={(e) => handleSize(e)}
                    id="sizeName"
                   value={sizeData.sizeName}
                    size="small" 
                    label="Size Name" 
                    placeholder="Enter Size name" />
               </Box><br/>

               <Box>              
                 <TextField className={classes.gridContent}
                     onChange={(e) => handleSize(e)}
                     id="sizePrice"
                     value={sizeData.sizePrice}
                     size="small"
                     label="Size Price" 
                     placeholder="Enter size price" />
              </Box><br/>
               <Button type="submit" size="small"  variant="contained">
                   Add Size
               </Button>
            <br/>
          </Grid>
        </Grid>
      </form>   
    </div>   
        </>
    );
}

export default SizesInput;