import http from "../http-common";

const getAll = () => {
	return http.get("/NumberPlate");
};

export default {
	getAll,
};
