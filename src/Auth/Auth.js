import auth0 from "auth0-js";

import React, { Component } from "react";

class Auth extends Component {
  constructor(history) {
    super();
    this.history = history;
    this.profile = null;
    this.requestedScopes = "openid profile email";
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENTID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      responseType: "token id_token",
      scope: this.requestedScopes,
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      // console.log("authResult:" + JSON.stringify(authResult));
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        alert(`Error: ${err.error}, for further info check console.`);
        console.log(err);
      }
      this.history.push("/");
    });
  };

  setSession = (authResult) => {
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    const scopes = authResult.scope || this.requestedScopes || "";
    console.log(
      "id token:" +
        authResult.idToken +
        ", access token:" +
        authResult.accessToken
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("scopes", scopes);
  };

  isAuthenticated = () => {
    const expiredAt = localStorage.getItem("expires_at");
    const isAuthentic = new Date().getTime() < expiredAt;
    return isAuthentic;
  };

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("scopes");
    this.profile = null;
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENTID,
      returnTo: "http://localhost:3000/",
    });
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) throw new Error("Access token not found");
    return accessToken;
  };

  getProfile = (callbackFunc) => {
    if (this.profile) return callbackFunc(this.profile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.profile = profile;
      console.log("Profile:" + profile);
      callbackFunc(profile, err);
    });
  };

  render() {
    return <div></div>;
  }
}

export default Auth;
