 import React from 'react';
import { Snackbar } from '@material-ui/core';
import {Alert} from '@material-ui/lab';


//Component for notification using alerts
const Notification=(props)=>{
    const {notify,setNotify}=props;

    const handleClose = (event, reason)=>{
        setNotify({
            ...notify,
            isOpen:false
        })
    }

    return (
        <Snackbar
        open={notify.isOpen}
        autoHideTimer={2000}        
        onClose={handleClose}
        >
            <Alert severity={notify.type} onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}
export default Notification;