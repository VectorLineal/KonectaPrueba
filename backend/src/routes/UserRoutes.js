const express = require("express");
// Controllers
const UserController = require("../controllers/UserController");
//Auth
const { validateAuth } = require("../middleware/JWTAuth");

const router = express.Router();

//create
router.post("/users", (req, res) => {
	UserController.createUser(req, res);
});

//autentication
router.post("/login", (req, res) => {
	UserController.login(req, res);
});

//read
//all users
router.get("/users", (req, res) => {
	validateAuth({ req, res }, 1, UserController.getUsers);
});

//a single user
router.get("/users/:id", (req, res) => {
	validateAuth({ req, res }, 1, UserController.getUser);
});

//update
//a single user
router.put("/users/:id", (req, res) => {
	validateAuth({ req, res }, 1, UserController.updateUser);
});

//delete
//a single user
router.delete("/users/:id", (req, res) => {
	validateAuth({ req, res }, 1, UserController.deleteUser);
});

module.exports = router;