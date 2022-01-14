import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAuthorizationHeader } from "../../utilities";
import ProfileContent from "./ProfileContent";
import ProfileImage from "./ProfileImage";
import { Box, Button, Grid, makeStyles } from "@material-ui/core";
import { Paper } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router";

const useStyles = makeStyles({
  profileContainer: {
    
    border: "2px solid #379bff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: "5px",
  },
  profileContent: {
    padding: '10px',
    borderRadius: "5px",
  },
});

const ProfileContainer = () => {
  const [profileInfo, setProfile] = useState(null);
  useEffect(() => {
    const getProfiles = async () => {
      try {
        const { data } = await axios.get(
          `https://localhost:7249/api/userprofiles`,
          getAuthorizationHeader()
        );
        setProfile(data);
      } catch (err) {
        console.log(`API ${err}`);
      }
    };
    getProfiles();
  }, []);
  const navigate = useNavigate();

  const classes = useStyles();

  return (
    
    <div>
      <Paper elevation={6} className={classes.profileContainer}>
        {
          profileInfo ?
        (
          <>
        <div>
          <Button
            variant="contained"
            style={{
              display: "inline",
              width: "6em",
              backgroundColor: "#379bff",
              margin: '15px 40px',
              float: 'right'
            }}
            onClick={() => navigate('/editprofile')}
          >
            Edit
          </Button>
        </div>
        <div>
        <Grid container spacing={2} style={{
          padding: '10px 10px'
        }}>
          <Grid item className={classes.profileContent} xs={12} md={4}>
            <ProfileImage profileInfo={profileInfo} />
          </Grid>
          <Grid item className={classes.profileContent} xs={12} md={8}>
            <ProfileContent profileInfo={profileInfo} />
          </Grid>
        </Grid>  
        </div>
        </>) : (
          <CircularProgress />
        )

      }
      </Paper>
    </div>
  );
};
export default ProfileContainer;
