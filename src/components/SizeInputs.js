import React from 'react';
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';

const SizeInputs = ({ idx, sizeState, handleSizeChange }) => {
    const sizeNameId = `sizeName-${idx}`;
    const sizePriceId = `sizePrice-${idx}`;
    return (
        <div key={`size-${idx}`}>
            <label>{`Size #${idx + 1}`}</label> 
            <br/>
            <br/>
             <Box>      
               <TextField sx={{ width: "45ch" }} 
                name={sizeNameId}
                data-idx={idx}
                id={sizeNameId}
                className="sizeName"
                value={sizeState[idx].sizeName}
                onChange={handleSizeChange} 
                size="small" id="outlined-basic" label="Size Name" placeholder="Enter Size name" />
             </Box>
             <br/>
             <Box>      
              <TextField sx={{ width: "45ch" }} name={sizePriceId}
                data-idx={idx}
                id={sizePriceId}
                className="sizePrice"
                value={sizeState[idx].sizePrice}
                onChange={handleSizeChange} size="small" id="outlined-basic" label="Size Price" placeholder="Enter Size price" />
             </Box><br/>


        </div>
    );
};

SizeInputs.propTypes = {
    idx: PropTypes.number,
    sizeState: PropTypes.array,
    handleSizeChange: PropTypes.func,
};

export default SizeInputs;