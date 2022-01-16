import auth0 from "auth0-js";
import React, { Component } from "react";
class Auth extends Component {
  constructor(navigate) {
    super();

    this.profile = null;
    this.navigate = navigate;
    this.requestedScopes = "openid profile email";
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
    this.auth0.parseHash((err, authResult) => {
      // console.log("authResult:" + JSON.stringify(authResult));
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        alert(`Error: ${err.error}, for further info check console.`);
        console.log(err);
      }
      this.navigate("/");
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
      clientID: "aTtr5NFcQFHgQC3UQ8Qov5eKfS1loV7y",
      returnTo: "http://localhost:3000/"
    });
  };

  static getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) throw new Error("Access token not found");
    return accessToken;
  };

  // getProfile = (callbackFunc) => {
  //   if (this.profile) return callbackFunc(this.profile);
  //   this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
  //     if (profile) this.profile = profile;
  //     console.log("Profile:" + profile);
  //     callbackFunc(profile, err);
  //   });
  // };

  
  getProfile = (callbackFunc) => {
    if (this.profile) return callbackFunc(this.profile);
    this.auth0.client.userInfo(Auth.getAccessToken(), (err, profile) => {
      if (profile) this.profile = profile;
      console.log("Profile:" + profile);
      callbackFunc(profile, err);
    });
  };

  

  userHasScopes(scopes) {
    const grantedScopes = (
      JSON.parse(localStorage.getItem("scopes")) || ""
    ).split(" ");

    return scopes.every((scope) => grantedScopes.includes(scope));
  }

  render() {
    return <div></div>;
  }
}

export default Auth;
