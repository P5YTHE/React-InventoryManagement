import React from 'react';
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import {handleSizeSubmit} from "./AddProduct";

const SizeInputs = ({ idx, sizeState, handleSizeChange }) => {
    const sizeNameId = `sizeName-${idx}`;
    const sizePriceId = `sizePrice-${idx}`;
    return (
        <>
        <form>
        <div key={`size-${idx}`}>
            <label>{`Size #${idx + 1}`}</label> 
            <br/>
            <br/>
             <Box>      
               <TextField sx={{ width: "45ch" }} 
                name={sizeNameId}
                data-idx={idx}
                id="sizeName"
                className="sizeName"
                value={sizeState[idx].sizeName}
                onChange={handleSizeChange} 
                size="small" label="Size Name" placeholder="Enter Size name" />
             </Box>
             <br/>
             <Box>      
              <TextField sx={{ width: "45ch" }} name={sizePriceId}
                data-idx={idx}
                id="sizePrice"
                className="sizePrice"
                value={sizeState[idx].sizePrice}
                onChange={handleSizeChange} size="small" label="Size Price" placeholder="Enter Size price" />
             </Box><br/>
             {/* <Button type="submit" size="big"  variant="contained">
                Add Size
             </Button> */}


        </div>
        </form>
        </>
    );
};

SizeInputs.propTypes = {
    idx: PropTypes.number,
    sizeState: PropTypes.array,
    handleSizeChange: PropTypes.func,
};

export default SizeInputs;