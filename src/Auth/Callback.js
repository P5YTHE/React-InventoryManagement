import React, { Component } from "react";

import withRouter from "./withRouter";

class Callback extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const { auth, location } = this.props;
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL");
    }
  }
  render() {
    return <h1>Loading...</h1>;
  }
}

export default withRouter(Callback);
