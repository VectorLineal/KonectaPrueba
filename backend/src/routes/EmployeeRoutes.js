const express = require("express");
// Controllers
const EmployeeController = require("../controllers/EmployeeController");
//Auth
const { validateAuth } = require("../middleware/JWTAuth");

const router = express.Router();

//read
//all employees
router.get("/employees", (req, res) => {
	validateAuth({ req, res }, 0, EmployeeController.getEmployees);
});

//a single employee
router.get("/employees/:id", (req, res) => {
	validateAuth({ req, res }, 0, EmployeeController.getEmployee);
});

module.exports = router;