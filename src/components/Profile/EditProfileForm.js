import { makeStyles } from "@material-ui/core";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
import { getAuthorizationHeader } from "../../utilities";
import { countriesList } from "../../Data/CountriesList";
import AlertDialog from "./AlertDialog";
import { useNavigate } from "react-router";

const useStyles = makeStyles({
  formContainer: {
    width: "100%",
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  gridContent: {
    width: "200px",
    margin: "10px 0",
  },
});

const EditProfileForm = () => {
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

  //  const [selectedCountry, setCountry] = useState(null);
  let selectedCountry = profile.userCountry;
  const [statesList, setStatesList] = useState(null);
  // let statesList = null;
//   console.log(profile);
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

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const getStateRequestBody = (country) => ({
    country: `${country}`,
  });

  if (!statesList && selectedCountry) {
    axios
      .post(
        "https://countriesnow.space/api/v0.1/countries/states",
        getStateRequestBody(selectedCountry)
      )
      //   .then((res) => res.json())
      .then((data) => setStatesList(data.data.data.states))
      .catch((err) => console.log(err));
  }

  const formHandler = (e) => {
    axios
      .put(
        "https://localhost:7249/api/userprofiles",
        profile,
        getAuthorizationHeader()
      )
      .then((res) => {
        res.status === 200 ? navigate("/profile") : navigate("/error");
      })
      .catch((err) => console.log(err));
  };

  const classes = useStyles();
  const gridContent = {
    margin: "10px 0",
  };
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {profile && (
        <form autoComplete="false">
          <Grid container alignItems="center" spacing={1}>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                variant="outlined"
                name="userFirstName"
                label="First Name"
                value={profile.userFirstName}
                onChange={(e) => handleOnChange(e)}
                style={gridContent}
              />

              <TextField
                variant="outlined"
                name="userLastName"
                label="Last Name"
                value={profile.userLastName}
                onChange={(e) => handleOnChange(e)}
                style={gridContent}
              />

              <TextField
                variant="outlined"
                name="userEmail"
                label="Email"
                value={profile.userEmail}
                onChange={(e) => handleOnChange(e)}
                style={gridContent}
              />

              <FormControl variant="outlined">
                <InputLabel>Country</InputLabel>
                <Select
                  sx={{ width: "20vw" }}
                  label="Country"
                  name="userCountry"
                  value={profile.userCountry}
                  onChange={(e) => handleOnChange(e)}
                   //   style={{

                  //   }}
                >
                  {countriesList.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined">
                <InputLabel>State</InputLabel>
                <Select
                  sx={{ width: "20vw" }}
                  label="State"
                  name="userState"
                  value={profile.userState}
                  onChange={(e) => handleOnChange(e)}
                  style={gridContent}
                >
                  {statesList &&
                    statesList.map((state) => (
                      <MenuItem key={state.name} value={state.name}>
                        {state.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                variant="outlined"
                name="companyName"
                label="Company Name"
                value={profile.companyName}
                onChange={(e) => handleOnChange(e)}
                style={gridContent}
              />

              <TextField
                variant="outlined"
                name="userPhoneNo"
                label="Phone number"
                value={profile.userPhoneNo}
                onChange={(e) => handleOnChange(e)}
                style={gridContent}
              />

              <TextField
                variant="outlined"
                name="userAddress"
                label="Address"
                value={profile.userAddress}
                onChange={(e) => handleOnChange(e)}
                style={gridContent}
              />

              <FormControl style={gridContent}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={profile.gender}
                  onChange={(e) => handleOnChange(e)}
                >
                  <FormControlLabel
                    value="male"
                    label="Male"
                    control={<Radio />}
                  ></FormControlLabel>
                  <FormControlLabel
                    value="female"
                    label="Female"
                    control={<Radio />}
                  ></FormControlLabel>
                  <FormControlLabel
                    value="others"
                    label="Others"
                    control={<Radio />}
                  ></FormControlLabel>
                </RadioGroup>
              </FormControl>

              <AlertDialog
                title="Proceed to update profile"
                desc="Verify the data before proceeding"
                button="Update Profile"
                dialogButton="Update"
                clickHandler={formHandler}
              />
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
};

export default EditProfileForm;
