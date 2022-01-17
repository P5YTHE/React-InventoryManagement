import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

//Comp to display loading circle
const Loading = () => {
  return (
    <div>
    
      <Backdrop
        sx={{ color: '#fff', zIndex: '5' }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
export default Loading