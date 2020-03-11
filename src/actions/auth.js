import axios from "axios";
import { SERVER, baseConfig, BEARER, AUTH } from "./config";
import { fetchProfile } from "./user";

export const login = (callback, body) => {
  const data = JSON.stringify(body);
  axios
    .post(`${SERVER}/api/Auth`, data, baseConfig)
    .then(res => {
      localStorage.setItem(BEARER, res.data.bearer);
      localStorage.setItem(AUTH, true);
      fetchProfile(callback);
    })
    .catch(err => {
      callback(err, null);
    });
};

export const registration = (callback, body) => {
  const data = JSON.stringify(body);
  axios
    .post(`${SERVER}/api/User`, data, baseConfig)
    .then(res => {
      localStorage.setItem(BEARER, res.data.bearer);
      localStorage.setItem(AUTH, true);
      fetchProfile(callback);
    })
    .catch(err => {
      console.log(err.response);
      callback(err, null);
    });
};
