import React from "react";
import { Layout } from "../components/base";
import Helmet from "react-helmet";
import { PROFILE } from "../actions/config";
import { Forbidden } from "../components/misc";
import UserImage from "../static/images/user_dp.svg";

const ProfileInformation = props => {
  let user = props.user;
  let blogName = decodeURIComponent(props.user.blogName);
  return (
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
        <strong>Name : {user.name}</strong>
      </li>
      <li className="list-group-item list-group-item-secondary text-left">
        <strong>Email : {user.email}</strong>
      </li>
      <li className="list-group-item list-group-item-secondary text-left">
        <strong>
          BlogName : <a href={`/blog/${user.blogName}`}>{blogName}</a>
        </strong>
      </li>
    </ul>
  );
};

const AccountView = props => {
  if (localStorage.getItem(PROFILE) === null) {
    return (
      <Layout>
        <Helmet>
          <title>Account | Blogger</title>{" "}
        </Helmet>
        <Forbidden />
        <h1 className="text-center">
          <a href="/login">Login first</a>
        </h1>
      </Layout>
    );
  }
  let user = JSON.parse(localStorage.getItem(PROFILE));
  return (
    <Layout>
      <Helmet>
        <title>Account | Blogger</title>
      </Helmet>
      <div className="flex-center mt-5">
        <div className="col-md-5">
          <ProfileInformation user={user} />
        </div>
      </div>
    </Layout>
  );
};

export default AccountView;
