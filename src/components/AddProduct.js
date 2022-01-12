import React from 'react';
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import { getDownloadURL,ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from '../firebase';
import { Input } from '@mui/material';

import { useState } from 'react';
import SizeInputs from './SizeInputs';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <Switch {...other} />;
  })(({ theme, expand }) => ({
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));



function AddProduct(){
    const [expanded, setExpanded] = React.useState(false);
    const [progress,setProgress]=useState(0);

    const handleExpandClick = () => {
         setExpanded(!expanded);
    };

    const formHandler = (e)=>{
        e.preventDefault();
        const file= e.target[0].files[0];
        uploadFiles(file);
      }

      const uploadFiles = (file) => {
        if(!file) return;
    
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef,file);
        uploadTask.on("state_changed",(snapshot)=>{
          const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        
        setProgress(prog);
    
        
      },(err)=>console.log(err),
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(url=>console.log(url))
      });
      };
    

    //new change
    const blankSize = { sizeName: '', sizePrice: '' };
    const [sizeState, setSizeState] = useState([
        { ...blankSize },
    ]);

    const addSize = () => {
        setSizeState([...sizeState, { ...blankSize }]);
    };

    const handleSizeChange = (e) => {
        const updatedSize = [...sizeState];
        updatedSize[e.target.dataset.idx][e.target.className] = e.target.value;
        setSizeState(updatedSize);
    };

    //change end


    return(
        <>
        <div>
            <h3>Add Product</h3>
        </div>
        <form>
        <Box>      
              <TextField sx={{ width: "45ch" }} size="small" id="outlined-basic" label="Product Name" placeholder="Enter Product name" />
        </Box><br/>

        <Box>              
              <TextField sx={{ width: "45ch" }} id="outlined-multiline-static" multiline rows={3} label="Product Description" placeholder="Enter Product description" />
        </Box><br/>

        <Box>             
              <TextField sx={{ width: "45ch" }} size="small" id="outlined-basic" label="Product Tag" placeholder="Enter Product tag" />
        </Box><br/>

        <Box>  
        <form onSubmit={formHandler}>
          <Input id="outlined-basic" type="file" className="input"></Input>
          <Button type="submit" size="big"  variant="contained">
              Upload
          </Button>
        </form>
        <h4>Uploaded {progress} %</h4>            
        </Box><br/>

        <Box>              
              <TextField sx={{ width: "45ch" }} size="small" id="outlined-number" label="Product Quantity" type="number" placeholder="1" InputLabelProps={{ shrink: true,}}/>
        </Box><br/>

        <Box >
              <TextField sx={{ width: "45ch" }} size="small" id="outlined-number" label="Product Discount" type="number" placeholder="25" InputLabelProps={{ shrink: true,}}/>
        </Box><br/>

        <Box> 
            <FormControl>
            <InputLabel id="demo-simple-select-label">Product Category</InputLabel>
            <Select labelId="demo-simple-select-label" label="Product Category" sx={{ width: "45ch" }} id="demo-simple-select">
              <MenuItem value={10}>Demo-Clothes</MenuItem>
              <MenuItem value={20}>Demo-Shoes</MenuItem>
              <MenuItem value={30}>Demo-Appliances</MenuItem>
            </Select>          
            </FormControl>
        </Box><br/>

        <div>
        <label>Different Sizes:  </label>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        </ExpandMore>
            
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            
            <Button variant="outlined" startIcon={<AddIcon />} onClick={addSize}>
                   Add Size
            </Button>
            <br/>
            <br/>
            {
                sizeState.map((val, idx) => (
                    <SizeInputs
                        key={`size-${idx}`}
                        idx={idx}
                        sizeState={sizeState}
                        handleSizeChange={handleSizeChange}
                    />
                ))
            }
        </Collapse>

        <Box>
              <TextField sx={{ width: "45ch" }} size="small" id="outlined-basic" label="Product Price" placeholder="Enter Product price" />
        </Box><br/>
        </form>
            
            </>
    );
}

export default AddProduct;