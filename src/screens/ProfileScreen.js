import React from "react";
import Profile from "../components/Profile/Profile";
import ProfileContainer from "../components/Profile/ProfileContainer";

export const ProfileScreen = ({ auth }) => {
    // console.log(678)
    // auth.getProfile((profile, err) => console.log(profile))
  return (
    <div>
      {/* <ProfileContainer /> */}
      {auth.isAuthenticated() ? <Profile auth={auth} /> : auth.login()}
    </div>
  );
};
