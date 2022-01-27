import React from "react";
import Profile from "../components/Profile/Profile";

export const ProfileScreen = ({ auth }) => {
  return (
    <div>
      {auth.isAuthenticated() ? <Profile auth={auth} /> : auth.login()}
    </div>
  );
};
