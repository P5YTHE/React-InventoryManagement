import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
//import {productData} from './AddProduct';
import axios from 'axios';
import { getAuthorizationHeader } from '../utilities';
import Auth from "../Auth/Auth";

function SizesInput(){
    const [showsForm, setShowForm] = useState(false);

    const showForm = () => {
       setShowForm(!showsForm);
    }
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
        <Box >
              <TextField sx={{ width: "45ch" }} 
                    onChange={(e) => handleSize(e)}
                    id="productId"
                    value={sizeData.productId}
                    size="small" 
                    label="Product Id" 
                    type="number" 
                    InputLabelProps={{ shrink: true,}}/>
        </Box><br/>
        {/* <Button variant="outlined" onClick={showForm}> <AddIcon /></Button> */}
          
            <form onSubmit={(e) => handleSizeSubmit(e)}>
            <Box>      
              <TextField sx={{ width: "45ch" }} 
                onChange={(e) => handleSize(e)}
                id="sizeName"
                value={sizeData.sizeName}
                size="small" 
                label="Size Name" 
                placeholder="Enter Size name" />
            </Box><br/>

             <Box>              
              <TextField sx={{ width: "45ch" }} 
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
            
         </form>
         
        </>

    );
}

export default SizesInput;