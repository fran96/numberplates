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
	console.log(data);
	return http.post("/Comment", data);
};

export default {
	getAll,
	find,
	create,
};
