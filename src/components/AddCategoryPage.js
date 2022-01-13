import * as React from 'react';
import { Button, Card } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import CategoryGrid from "./CategoryGrid";
import Box from '@mui/material/Box';
import AddCategory from './AddCategory';



const AddCategoryPage = () => {
    return(
        
        <>
            {/* <Button size="small" variant="contained" color="success" onClick={{AddCategory}}>Add Category</Button> */}
            {/* <Box
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
      <div>
      <TextField
          disabled
          id="outlined-disabled"
          label="CategoryId"
          defaultValue="CategoryID"
        />
        
      </div>
      <div>
      <Button size="small" variant="contained" color="inherit"  >Save</Button>
      </div>
      
    </Box> */}
            <AddCategory/>
        </>
        )
};
export default AddCategoryPage;
