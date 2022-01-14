import React from "react";
import ContentTile from "./ContentTile";

const ProfileContent = ({ profileInfo }) => {
  console.log(profileInfo);

  return (
    <div>
      {profileInfo && (
        <>
          <ContentTile value={profileInfo.userFirstName}>
            First Name
          </ContentTile>
          <ContentTile value={profileInfo.userLastName}>Last Name</ContentTile>
          <ContentTile value={profileInfo.companyName}>
            Company Name
          </ContentTile>
          <ContentTile value={profileInfo.userEmail}>Email</ContentTile>
        </>
      )}
    </div>
  );
};
export default ProfileContent;
