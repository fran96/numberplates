import http from "../http-common";

const getAll = () => {
  return http.get("/Comment");
};

const find = (numberPlate) => {
  var url = "/getCommentsByNumberPlate?";
  url += numberPlate != null ? "numberPlate=" + numberPlate : "";
  return http.get(url);
};

const create = (data) => {
  return http.post("/Comment", data);
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getAll,
  find,
  create,
};
