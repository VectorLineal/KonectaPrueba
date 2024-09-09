// Managers
const RequestManager = require("../managers/RequestManager");

const createRequest = async (req, res) => {
	const data = req.body;
	try {
		const newRequest = await RequestManager.createRequest(data);
		return res.status(201).send(newRequest);
	} catch (e) {
		return res.status(500).send({ message: e.message });
	}
};

const getRequests = async (req, res) => {
	try {
		const requests = await RequestManager.getRequests();
		return res.status(200).send(requests);
	} catch (e) {
		return res.status(500).send({ message: e.message });
	}
};
const getRequestsByEmployee = async (req, res) => {
	const { id } = req.params;
	try {
		const requests = await RequestManager.getRequestsByEmployee(id);
		return res.status(200).send(requests);
	} catch (e) {
		return res.status(500).send({ message: e.message });
	}
};
const getRequest = async (req, res) => {
	const { id } = req.params;
	try {
		const request = await RequestManager.getRequest(id);
		return res.status(200).send(request);
	} catch (e) {
		return res.status(500).send({ message: e.message });
	}
};
const deleteRequest = async (req, res) => {
	const { id } = req.params;
	try {
		await RequestManager.deleteRequest(id);
		return res.sendStatus(200);
	} catch (e) {
		return res.status(500).send({ message: e.message });
	}
};

module.exports = {
	createRequest,
	getRequests,
	getRequestsByEmployee,
	getRequest,
	deleteRequest
};