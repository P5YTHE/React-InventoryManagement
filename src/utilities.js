import Auth from "./Auth/Auth";

export const getAuthorizationHeader = () => ({
    headers: {
      Authorization: `Bearer ${Auth.getAccessToken()}`,
    },
  })

  export const getStatesArray = data => (
    data.map(item => item.name)
  )

