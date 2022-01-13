import React from "react";
import { getDownloadURL,ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from '../firebase';

function UploadFile(){
    const [progress,setProgress]=useState(0);
    const [newLink,setLink]=useState('');

    //for uploading files
    const uploadFiles = (file) => {
        if(!file) return;
    
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef,file);
        uploadTask.on("state_changed",(snapshot)=>{
          const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        
        setProgress(prog);
    
        
      },(err)=>console.log(err),
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(url=>{
            //setLink(url);
            console.log(url);
        })
      });
      };

    const formHandler = (e)=>{
        e.preventDefault();
        console.log(1);
        const file= e.target[0].files[0];
        uploadFiles(file);
      }
    //upload files end

    return(
        <>
        <Box>  
         <form onSubmit={formHandler}> 
          <input  type="file" className="input"></input>
          <button type="submit" size="big"  variant="contained">
              Upload
          </button>
         </form> 
        <h4>Uploaded {progress} %</h4>          
        </Box><br/>
        </>
    );
}