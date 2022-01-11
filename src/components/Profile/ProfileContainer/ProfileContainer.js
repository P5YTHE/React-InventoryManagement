import axios from 'axios'
import React, {useEffect , useState } from 'react'
import { getAuthorizationHeader } from '../../../utilities'
import ProfileContent from '../ProfileContent/ProfileContent'
import ProfileImage from '../ProfileImage/ProfileImage'

export const ProfileContainer = () => {
    const [profileInfo, setProfile] = useState(null)
    useEffect(() => {
        const getProfiles = async () => {
            const { data } = await axios.get(`https://localhost:7249/api/userprofiles`,getAuthorizationHeader());
            setProfile(data);           
        }
        getProfiles();
        }    
    , [])

    return (
        <div >
            <ProfileImage />
            <ProfileContent profileInfo={profileInfo}/>
        </div>
    )
}
