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
import Notification from "../Notification";
import Loading from "./Loading";

/////////////////////////////////////////////////////////////////////////////////////////////////

const useStyles = makeStyles(componentStyles);

const Profile = ({ auth }) => {
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
  const [statesList, setStatesList] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  let selectedCountry = profile.userCountry;

  // loading profile details
  useEffect(() => {
    getProfileDetails(auth)
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error while loading profile details : " + err);
        navigate("/error");
      });
  }, []);

  // geting list of states for selected country
  if (!statesList && selectedCountry) {
    getStateByCountry(selectedCountry).then((data) => setStatesList(data));
  }

  // handle changes of value of form fields
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
    if (name === "userCountry") {
      getStateByCountry(value).then((data) => setStatesList(data));
    }
    setIsChanged(true);
    validate({ [name]: value });
  };

  // Real time validation of user inputs
  const validate = (obj = profile) => {
    let messages = { ...errors };
    if ("userFirstName" in obj) {
      messages.userFirstName = /^&|^[a-zA-Z]*$/.test(obj.userFirstName)
        ? ""
        : "First name must only have alphabets";
    }
    if ("userLastName" in obj) {
      messages.userLastName = /^[a-zA-Z]*$/.test(obj.userLastName)
        ? ""
        : "Last name must only have alphabets";
    }
    if ("userPhoneNo" in obj) {
      messages.userPhoneNo =
        obj.userPhoneNo.length == 10 || obj.userPhoneNo == ""
          ? ""
          : "Phone number must have 10 digits";
    }
    setErrors(messages);

    if (obj == profile) {
      return Object.values(messages).every((value) => value == "");
    }
  };

  // upload profile image file to firebase and generate image url
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

  // handle update profile api response
  const updateProfile = () => {
    updateProfileAsync(profile)
      .then((res) => {
        navigate("/profile");
        setNotify({
          isOpen: true,
          message: "Profile updated successfully !!!",
          type: "success",
        });
      })
      .catch((err) => {
        console.log("Error while updating profile : " + err);
        setNotify({
          isOpen: true,
          message: "Error occured while updating profile",
          type: "error",
        });
      });
  };

  // when update profile form is submited, validate and proceed
  const formHandler = (e) => {
    if (validate()) {
      updateProfile();
    } else {
      setNotify({
        isOpen: true,
        message: "Enter valid fields to submit changes",
        type: "warning",
      });
    }
  };

  //handler to upload images
  const uploadHandler = (e) => {
    e.preventDefault();
    console.log(e, e.target[0], e.target[0].files[0]);
    if (!e.target[0].files[0]) return;
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  return (
    <>
      {loading && <Loading />}
      <Paper elevation={6}>
        <Container
          maxWidth="lg"
          component={Box}
          marginTop="-3rem"
          classes={{ root: classes.containerRoot }}
        >
          <Grid container>
            <Notification notify={notify} setNotify={setNotify} />
            <Grid
              item
              xs={12}
              xl={8}
              component={Box}
              marginBottom="2rem"
              classes={{ root: classes.gridItemRoot }}
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
                            error={!!errors.userFirstName}
                            helperText={errors.userFirstName}
                          />
                          <GridComp
                            textField
                            gridSize="6"
                            formLabel="Last Name"
                            name="userLastName"
                            value={profile.userLastName}
                            handleChange={handleOnChange}
                            error={!!errors.userLastName}
                            helperText={errors.userLastName}
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
                            type="number"
                            error={!!errors.userPhoneNo}
                            helperText={errors.userPhoneNo}
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
                            disabled
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
