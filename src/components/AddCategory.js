import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button} from "@material-ui/core";
import { useNavigate } from "react-router";

export default function AddCategory() {
    const navigate = useNavigate();
  return (
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
        required
        id="outlined-required"
        label="Required"
        defaultValue="Category Name"
      />
      
      
      
      
     
    </div>
    {/* <div>
    <TextField
        disabled
        id="outlined-disabled"
        label="CategoryId"
        defaultValue="CategoryID"
      />
      
    </div> */}
    <div>
    <Button size="small" variant="contained" color="inherit" onClick={()=>{navigate("/categories")}}>Save</Button>
    </div>
    
  </Box>
  );
}


