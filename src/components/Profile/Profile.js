import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import componentStyles from "./componentStyles";
import themeColors, { valuesColor } from "./colors";
import { CardMedia } from "@material-ui/core";
import { IconButton, Input, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import {
  getProfileDetails,
  getStateByCountry,
  updateProfileAsync,
} from "./APICalls";
import { GridComp } from "./Controls/GridComp";
import { genderList } from "../../Data/genderList";
import { countriesList } from "../../Data/CountriesList";
import AlertDialog from "./AlertDialog";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../firebase";

const useStyles = makeStyles(componentStyles);

const Profile = () => {
  const classes = useStyles();

  const initProfile = {
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPhoneNo: "",
    companyName: "",
    gender: "",
    userAddress: "",
    userState: "",
    userCountry: "",
    profilePictureUrl: "",
  };
  const navigate = useNavigate();
  const [profile, setProfile] = useState(initProfile);
  let selectedCountry = profile.userCountry;
  const [statesList, setStatesList] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    getProfileDetails().then((data) => setProfile(data));
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
    setIsChanged(true);
  };

  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            console.log(url);
            return setProfile({
              ...profile,
              profilePictureUrl: url,
            });
          })
          .then((r) => updateProfile())
          .catch((err) => console.log(err));
      }
    );
  };

  const updateProfile = () => {
    updateProfileAsync(profile).then((res) => {
      console.log(res);
      res?.status === 200 ? navigate("/profile") : navigate("/error");
    });
  };

  if (!statesList && selectedCountry) {
    getStateByCountry(selectedCountry).then((data) => setStatesList(data));
  }

  const formHandler = (e) => {
    updateProfile();
  };

  const uploadHandler = (e) => {
    e.preventDefault();
    console.log(e, e.target[0], e.target[0].files[0]);
    if (!e.target[0].files[0]) return;
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  return (
    <>
      <Paper elevation={6}>
        <Container
          maxWidth="lg"
          component={Box}
          marginTop="-3rem"
          classes={{ root: classes.containerRoot }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              xl={8}
              component={Box}
              marginBottom="2rem"
              classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
            >
              <Card
                classes={{
                  root: classes.cardRoot + " " + classes.cardRootSecondary,
                }}
              >
                <CardHeader
                  subheader={
                    <Grid
                      container
                      component={Box}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item xs="auto">
                        <Box
                          component={Typography}
                          variant="h4"
                          marginBottom="0!important"
                          color={themeColors.gray[900]}
                        >
                          My Account
                        </Box>
                      </Grid>
                      <Grid item xs="auto">
                        <Box
                          justifyContent="flex-end"
                          display="flex"
                          flexWrap="wrap"
                        >
                          {isChanged && (
                            <AlertDialog
                              title="Proceed to update profile"
                              desc="Verify the data before proceeding"
                              button="Update Changes"
                              dialogButton="Update"
                              clickHandler={formHandler}
                            />
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  }
                  classes={{ root: classes.cardHeaderRoot }}
                ></CardHeader>
                <CardContent>
                  <Box
                    component={Typography}
                    variant="h6"
                    color={valuesColor}
                    paddingTop=".25rem"
                    paddingBottom=".25rem"
                    fontSize=".75rem!important"
                    letterSpacing=".04em"
                    marginBottom="1.5rem!important"
                    classes={{ root: classes.typographyRootH6 }}
                  >
                    User Information
                  </Box>
                  <div className={classes.plLg4}>
                    <Grid container>
                      <Grid item xs={12} lg={8}>
                        <Grid container>
                          <GridComp
                            textField
                            gridSize="6"
                            formLabel="First Name"
                            name="userFirstName"
                            value={profile.userFirstName}
                            handleChange={handleOnChange}
                          />
                          <GridComp
                            textField
                            gridSize="6"
                            formLabel="Last Name"
                            name="userLastName"
                            value={profile.userLastName}
                            handleChange={handleOnChange}
                          />
                        </Grid>
                        <Grid container>
                          <GridComp
                            textField
                            gridSize="6"
                            formLabel="Phone Number"
                            name="userPhoneNo"
                            value={profile.userPhoneNo}
                            handleChange={handleOnChange}
                          />
                          <GridComp
                            radioButton
                            gridSize="6"
                            radioList={genderList}
                            formLabel="Gender"
                            name="gender"
                            value={profile.gender}
                            handleChange={handleOnChange}
                          />
                        </Grid>
                        <Grid container>
                          <GridComp
                            textField
                            gridSize="6"
                            formLabel="Email"
                            name="userEmail"
                            value={profile.userEmail}
                            handleChange={handleOnChange}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} lg={4}>
                        <form onSubmit={uploadHandler}>
                          <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="flex-end"
                            alignItems="center"
                          >
                            <CardMedia
                              component="img"
                              image={
                                profile.profilePictureUrl ||
                                "https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg"
                              }
                              alt="Profile picture"
                              className={classes.profileImage}
                            />

                            <label htmlFor="profile-img-input">
                              <Input
                                style={{ margin: "15px" }}
                                id="profile-img-input"
                                accept="image/*"
                                type="file"
                              />
                            </label>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                            >
                              Upload
                            </Button>
                          </Box>
                        </form>
                      </Grid>
                    </Grid>
                  </div>
                  <Box
                    component={Divider}
                    marginBottom="1.5rem!important"
                    marginTop="1.5rem!important"
                  />
                  <Box
                    component={Typography}
                    variant="h6"
                    color={valuesColor}
                    paddingTop=".25rem"
                    paddingBottom=".25rem"
                    fontSize=".75rem!important"
                    letterSpacing=".04em"
                    marginBottom="1.5rem!important"
                    classes={{ root: classes.typographyRootH6 }}
                  >
                    Contact Information
                  </Box>
                  <div className={classes.plLg4}>
                    <Grid container>
                      <GridComp
                        textField
                        formLabel="Address"
                        name="userAddress"
                        value={profile.userAddress}
                        handleChange={handleOnChange}
                      />

                      <GridComp
                        dropdown
                        dropdownList={countriesList}
                        formLabel="Country"
                        name="userCountry"
                        value={profile.userCountry}
                        handleChange={handleOnChange}
                      />

                      <GridComp
                        dropdown
                        dropdownList={statesList}
                        formLabel="State"
                        name="userState"
                        value={profile.userState}
                        handleChange={handleOnChange}
                      />
                    </Grid>
                  </div>
                  <Box
                    component={Divider}
                    marginBottom="1.5rem!important"
                    marginTop="1.5rem!important"
                  />
                  <Box
                    component={Typography}
                    variant="h6"
                    color={valuesColor}
                    paddingTop=".25rem"
                    paddingBottom=".25rem"
                    fontSize=".75rem!important"
                    letterSpacing=".04em"
                    marginBottom="1.5rem!important"
                    classes={{ root: classes.typographyRootH6 }}
                  >
                    Company Information
                  </Box>
                  <div className={classes.plLg4}>
                    <Grid container>
                      <GridComp
                        textField
                        formLabel="Company Name"
                        name="companyName"
                        value={profile.companyName}
                        handleChange={handleOnChange}
                      />
                    </Grid>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

export default Profile;
