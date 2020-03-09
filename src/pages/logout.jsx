import React from "react";
import { Layout } from "../components/base";
import { Helmet } from "react-helmet";

const Logout = props => {
  return (
    <Layout>
      <Helmet>
        <title>Logout | Blogger</title>
      </Helmet>
      <center className="mt-5">
        <h6>You logged out</h6>
      </center>
    </Layout>
  );
};

export default Logout;
