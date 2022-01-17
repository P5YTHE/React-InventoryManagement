import auth0 from "auth0-js";
import React, { Component } from "react";
class Auth extends Component {
  constructor(navigate) {
    super();
    this.navigate = navigate;
    // scopes that is expected from auth0
    this.requestedScopes = "openid profile email";
    //new auth0 web auth setup
    this.auth0 = new auth0.WebAuth({
      domain: "dev-tapp.us.auth0.com",
      clientID: "aTtr5NFcQFHgQC3UQ8Qov5eKfS1loV7y",
      redirectUri: "http://localhost:3000/callback",
      audience: "https://localhost:7261",
      responseType: "token id_token",
      scope: this.requestedScopes,
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    // extract access and id tokens from url hash
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        alert(`Error: ${err.error}, for further info check console.`);
        console.log(err);
      }
      this.navigate("/");
    });
  };

  // set local storage with auth tokens and expiry
  setSession = (authResult) => {
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
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
    this.auth0.logout({
      clientID: "aTtr5NFcQFHgQC3UQ8Qov5eKfS1loV7y",
      returnTo: "http://localhost:3000/",
    });
  };

  static getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.log("Access token not found");
      this.navigate("/error");
    }
    return accessToken;
  };

  render() {
    return <div></div>;
  }
}

export default Auth;
