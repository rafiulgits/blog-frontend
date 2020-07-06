import axios from "axios";
import { SERVER, baseConfig, BEARER } from "./config";

export const fetchArticlePage = (callback, skip, top) => {
  if (typeof skip !== "number" || typeof top !== "number") {
    throw new TypeError("parameter should be number");
  }
  axios
    .get(`${SERVER}/api/Post/page/${skip}/${top}?order=desc`, baseConfig)
    .then(res => callback(null, res.data))
    .catch(err => callback(err, null));
};

export const fetchArticleItem = (callback, id) => {
  axios
    .get(`${SERVER}/api/Post/${id}`, baseConfig)
    .then(res => callback(null, res.data))
    .catch(err => callback(err, null));
};

export const createArticle = (callback, body) => {
  if (localStorage.getItem(BEARER) === null) {
    throw new Error("no authorization token found");
  }
  var config = baseConfig;
  config.headers["Authorization"] = `Bearer ${localStorage.getItem(BEARER)}`;
  let data = JSON.stringify(body);
  axios
    .post(`${SERVER}/api/Post`, data, config)
    .then(res => callback(null, res.data))
    .catch(err => callback(err, null));
};

export const updateArticle = (callback, body) => {
  if (localStorage.getItem(BEARER) === null) {
    throw new Error("no authorization token found");
  }
  var config = baseConfig;
  config.headers["Authorization"] = `Bearer ${localStorage.getItem(BEARER)}`;
  let data = JSON.stringify(body);
  axios
    .put(`${SERVER}/api/Post`, data, config)
    .then(res => callback(null, res.data))
    .catch(err => callback(err, null));
};

export const deleteArticle = (callback, id) => {
  if (localStorage.getItem(BEARER) === null) {
    throw new Error("no authorization token found");
  }
  var config = baseConfig;
  config.headers["Authorization"] = `Bearer ${localStorage.getItem(BEARER)}`;
  axios
    .delete(`${SERVER}/api/Post/${id}`, config)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err, null);
    });
};

export const fetchArticlesByBlog = (callback, name) => {
  var config = baseConfig;
  axios
    .get(`${SERVER}/api/Post/blog/${name}`, config)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err, null);
    });
};

export const searchArticles = (callback, filter) => {
  var config = baseConfig;
  axios
    .get(`${SERVER}/api/Post?filter=${filter}`, config)
    .then(res => {
      callback(null, res.data);
    })
    .catch(err => {
      callback(err, null);
    });
};
