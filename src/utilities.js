import Auth from "./Auth/Auth"


export const getAuthorizationHeader = () => ({
    headers: {
      Authorization: `Bearer ${Auth.getAccessToken()}`,
    },
  })