// Schemas
const { Request } = require("../models/Request");

const createRequest = async (data) => {
	try {
		const newRequest = await Request.create(data);
		return newRequest;
	} catch (e) {
		throw new Error(e);
	}
};

const getRequests = async () => {
	try {
		const requests = await Request.findAll();
		return requests;
	} catch (e) {
		throw new Error(e);
	}
};

const getRequest = async (id) => {
	try {
		const request = await Request.findByPk(id);
		return request;
	} catch (e) {
		throw new Error(e);
	}
};
const deleteRequest = async (id) => {
	try {
		const request = await Request.destroy({ where:{id} });
		return request;
	} catch (e) {
		throw new Error(e);
	}
};

module.exports = {
	createRequest,
	getRequests,
	getRequest,
    deleteRequest
};