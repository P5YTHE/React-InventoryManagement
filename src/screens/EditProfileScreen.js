import React, { useEffect, useState } from "react";
import EditProfileForm from "../components/Profile/EditProfileForm";
import Profile from "../components/Profile/Profile";
import { getAuthorizationHeader } from "../utilities";

const EditProfileScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{          
          border: "2px solid cyan",
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "70%",
        }}
      >
        <EditProfileForm />
        {/* <Profile /> */}
      </div>
    </div>
  );
};
export default EditProfileScreen;
