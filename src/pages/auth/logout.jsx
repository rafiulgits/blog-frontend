import React from "react";
import { Layout } from "../../components/base";
import { Helmet } from "react-helmet";

const Logout = props => {
  localStorage.clear();
  return (
    <Layout>
      <Helmet>
        <title>Logout | Blogger</title>
      </Helmet>
      <center className="mt-5">
        <h1>You logged out</h1>
      </center>
    </Layout>
  );
};

export default Logout;
