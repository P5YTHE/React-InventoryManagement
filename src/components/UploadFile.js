import React from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../firebase";
import { useState } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import DoneIcon from '@mui/icons-material/Done';


//Component for Uploading files to firebase storage bucket
const UploadFile = (props) => {
  const { url, setUrl } = props;
  const [progress, setProgress] = useState(0);
  const [tick,setTick]=useState(false);

  //for uploading files
  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );        
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
          setTick(true);
        });
      }
    );
  };
  console.log(url);
  

  const handleTick=()=>{
    if(tick)
    {
      return(
        <DoneIcon/>
      )
    }
    else{
      return(
        <></>
      )
    }
  }

  const formHandler = (e) => {
    e.preventDefault();
    console.log(1);
    const file = e.target[0].files[0];
    uploadFiles(file);
  };
  //upload files end

  return (
    <>
      <Box>
        <form onSubmit={formHandler}>
          <input type="file" className="input"></input>
          <Button type="submit" size="medium" variant="contained">
            Upload
          </Button>
          {tick?<DoneIcon/>:<></>}
        </form>        
      </Box>
      <br />
    </>
  );
};

export default UploadFile;
