import axios from "axios";

const handleSuccess = (response) => {
	return response;
};

const handleError = (error) => {
	console.log("Error making HTTP call");
	console.log(error);
	if (error.response == null) {
		console.log("No response from server");
		return;
	}
	switch (error.response.status) {
		case 401:
			localStorage.clear();
			document.location.href = "/";
			break;
		default:
			break;
	}
	return Promise.reject(error);
};

const service = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});
service.interceptors.response.use(handleSuccess, handleError);

export default service;
