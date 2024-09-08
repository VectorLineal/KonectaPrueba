// Managers
const EmployeeManager = require("../managers/EmployeeManager");

const createEmployee = async (req, res) => {
	try {
		const data = req.body;
		console.log("employee data:", data);
		const newEmployee = await EmployeeManager.createEmployee(data);
		return res.status(201).send(newEmployee);
	} catch (e) {
		return res.status(500).send({ message: e.message });
	}
};

const getEmployees = async (req, res) => {
	try {
		const employees = await EmployeeManager.getEmployees();
		return res.status(200).send(employees);
	} catch (e) {
		return res.status(500).send({ message: e.message });
	}
};
const getEmployee = async (req, res) => {
	const { id } = req.params;
	try {
		const employee = await EmployeeManager.getEmployee(id);
		return res.status(200).send(employee);
	} catch (e) {
		return res.status(500).send({ message: e.message });
	}
};

module.exports = {
	createEmployee,
	getEmployees,
	getEmployee
};