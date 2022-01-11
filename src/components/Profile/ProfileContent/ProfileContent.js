import React from 'react';


const ProfileContent = ({ profileInfo }) => {
    console.log(profileInfo);
    
    return (
        <div>
            Profile content
            { 
                profileInfo && (<pre>{profileInfo.userFirstName}</pre>)
            }
            
        </div>
    )
}
export default ProfileContent;
