import axios from "axios";
import { getAuthHeaderWithEmail, getAuthorizationHeader, getStatesArray } from "../../utilities";

export const getProfileDetails = async () => {
  try {
    console.log('inside get profile api')
    const { data } = await axios.get(
      `https://localhost:7249/api/userprofiles`,
      getAuthorizationHeader()
    );
    return data;
  } catch (err) {
    console.log(`API ${err}`);
    return err;
  }
};

export const getStateByCountry = async (selectedCountry) => {
  try {
    const res = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/states",
      {
        country: `${selectedCountry}`,
      }
    );
    const data = res.data.data.states;
    const states = await getStatesArray(data);
    return states;
  } catch (err) {
    console.log(err);
  }
};

export const updateProfileAsync = async (profile) => {
  try {
    const res = await axios.put(
      "https://localhost:7249/api/userprofiles",
      profile,
      getAuthorizationHeader()
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
