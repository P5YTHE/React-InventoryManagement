import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { getAuthorizationHeader } from '../utilities';
import Auth from "../Auth/Auth";
import Grid from '@mui/material/Grid';



function SizesInput({productId}){
    console.log(productId);
    const sizeUrl='https://localhost:7177/api/Sizes/CreateSize';
    const[sizeData,setSizeData]=useState({
        productId:{productId},
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
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
      }


    return(
        <>
        
        <br/>
        <form onSubmit={(e) => handleSizeSubmit(e)}>
           <Grid container spacing={3}>
            
                {/* <Grid item xs={12} >
                  <TextField fullWidth
                  variant="standard"
                    onChange={(e) => handleSize(e)}
                    id="productId"
                    value={sizeData.productId}
                    size="small" 
                    label="Product Id" 
                    type="number" 
                    InputLabelProps={{ shrink: true,}}/>
                </Grid> */}
                <Grid item xs={12} sm={6}>      
                  <TextField fullWidth
                  variant="standard"
                   onChange={(e) => handleSize(e)}
                    id="sizeName"
                   value={sizeData.sizeName}
                    size="small" 
                    label="Size Name" 
                    placeholder="Enter Size name" />
               </Grid>

               <Grid item xs={12} sm={6}>              
                 <TextField fullWidth
                 variant="standard"
                     onChange={(e) => handleSize(e)}
                     id="sizePrice"
                     value={sizeData.sizePrice}
                     size="small"
                     label="Size Price" 
                     placeholder="Enter size price" />
              </Grid>
              <Grid item xs={12}>
              <Button type="submit" size="small"  variant="contained">
                   Add Size
               </Button>

              </Grid>
              
            <br/>
        </Grid>
      </form>   
    
        </>
    );
}

export default SizesInput;