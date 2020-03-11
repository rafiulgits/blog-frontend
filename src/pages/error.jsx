import React from "react";
import Helmet from "react-helmet";
import { Layout } from "../components/base";
import NotFoundImage from "../static/images/404.svg";

const ErroView = props => {
  return (
    <Layout>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className="flex-center mt-5">
        <div className="col-md-4">
          <img className="img-fluid" src={NotFoundImage} alt="not found" />
        </div>
      </div>
    </Layout>
  );
};

export default ErroView;
