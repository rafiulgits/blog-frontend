import axios from "axios";
import { SERVER, baseConfig } from "./config";

export const fetchArticlePage = (callback, skip, top) => {
  if (typeof skip !== "number" || typeof top !== "number") {
    throw new TypeError("parameter should be number");
  }
  axios
    .get(`${SERVER}/api/Post/page/${skip}/${top}`, baseConfig)
    .then(res => callback(null, res.data))
    .catch(err => callback(err, null));
};

export const fetchArticleItem = (callback, id) => {
  axios
    .get(`${SERVER}/api/Post/${id}`, baseConfig)
    .then(res => callback(null, res.data))
    .catch(err => callback(err, null));
};
