import axios from "axios";
import { BEARER, SERVER, baseConfig, PROFILE } from "./config";

export const fetchProfile = callback => {
  if (localStorage.getItem(BEARER) === null) {
    let err = new Error("user is not authenticated");
    return callback(err, null);
  }
  var config = baseConfig;
  config.headers["Authorization"] = `Bearer ${localStorage.getItem(BEARER)}`;
  axios
    .get(`${SERVER}/api/User`, config)
    .then(res => {
      localStorage.setItem(PROFILE, JSON.stringify(res.data));
      callback(null, res.data);
    })
    .catch(err => {
      callback(err, null);
    });
};
