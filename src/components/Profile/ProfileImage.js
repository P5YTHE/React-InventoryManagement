import { CardMedia } from "@material-ui/core";
import { Paper } from "@mui/material";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import React, { useState } from "react";
import { storage } from "../../firebase";
import axios from "axios";
import { getAuthorizationHeader } from "../../utilities";
import { useNavigate } from "react-router";

const ProfileImage = ({ profileInfo }) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
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
        getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
            console.log(url);
            profileInfo.profilePictureUrl = url;
            return axios.put("https://localhost:7249/api/userprofiles", profileInfo, getAuthorizationHeader())
        })
        .then(res => {
            res.status === 200 ? (navigate('/profile')) : (navigate('/error'))
        })
        .catch(err => console.log(err));
      }
    );
  };

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  return (
    <div>
      <Paper
        elevation={6}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardMedia
          style={{
            backgroundRepeat: "no-repeat",
            width: "90%",
          }}
          component="img"
          image={ profileInfo.profilePictureUrl || "https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg"}
          alt="Profile picture"
        />

        <form onSubmit={formHandler}>
          <input type="file" className="input"></input>
          <button type="submit">Upload</button>
        </form>
        {/* <h3>Uploaded {progress} %</h3> */}
      </Paper>
    </div>
  );
};
export default ProfileImage;
