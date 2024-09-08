// Schemas
const { Employee } = require("../models/Employee");
const { Request } = require("../models/Request");

const createEmployee = async (data) => {
	try {
		const newEmployee = await Employee.create(data);
		return newEmployee;
	} catch (e) {
		throw new Error(e);
	}
};

const getEmployees = async () => {
	try {
		const employees = await Employee.findAll();
		return employees;
	} catch (e) {
		throw new Error(e);
	}
};

const getEmployee = async (id) => {
	try {
		const employee = await Employee.findByPk(id, {include: [{model: Request, as: "request"}]});
		return employee;
	} catch (e) {
		throw new Error(e);
	}
};

module.exports = {
	createEmployee,
	getEmployees,
	getEmployee
};