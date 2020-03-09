import axios from "axios";
import { SERVER, baseConfig } from "./config";

export const login = (callback, body) => {
  const data = JSON.stringify(body);
  axios
    .post(`${SERVER}/api/Auth`, data, baseConfig)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err, null);
    });
};
