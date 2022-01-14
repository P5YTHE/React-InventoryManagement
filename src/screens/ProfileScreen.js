import React from "react";
import Profile from "../components/Profile/Profile";
import ProfileContainer from "../components/Profile/ProfileContainer";

export const ProfileScreen = ({ auth }) => {
    console.log(678)
  return (
    <div>
      {/* <ProfileContainer /> */}
      {auth.isAuthenticated() ? <Profile /> : auth.login()}
    </div>
  );
};
