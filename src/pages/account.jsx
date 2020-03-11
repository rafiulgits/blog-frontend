import React from "react";
import { Layout } from "../components/base";
import Helmet from "react-helmet";
import { PROFILE } from "../actions/config";
import UserImage from "../static/images/user_dp.svg";

const AccountView = props => {
  let user = JSON.parse(localStorage.getItem(PROFILE));
  return (
    <Layout>
      <Helmet>
        <title>Account | Blogger</title>
      </Helmet>
      <div className="flex-center mt-5">
        <div className="col-md-5">
          <ul className="list-group">
            <div className="flex-center">
              <img
                src={UserImage}
                alt="user"
                className="img-fluid p-4"
                width="200"
                height="200"
              />
            </div>
            <li className="list-group-item list-group-item-secondary text-left">
              <strong>
                Name : {user.firstName} {user.lastName}
              </strong>
            </li>
            <li className="list-group-item list-group-item-secondary text-left">
              <strong>Email : {user.email}</strong>
            </li>
            <li className="list-group-item list-group-item-secondary text-left">
              <strong>
                BlogName :{" "}
                <a href={`/blog/${user.blogName}`}>{user.blogName}</a>
              </strong>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default AccountView;
