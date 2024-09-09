const express = require("express");
// Controllers
const RequestController = require("../controllers/RequestController");
//Auth
const { validateAuth } = require("../middleware/JWTAuth");

const router = express.Router();

//create
router.post("/requests", (req, res) => {
    validateAuth({ req, res }, 1, RequestController.createRequest);
});

//read
//all requests
router.get("/requests", (req, res) => {
	validateAuth({ req, res }, 0, RequestController.getRequests);
});

router.get("/requestsEmployee/:id", (req, res) => {
	validateAuth({ req, res }, 0, RequestController.getRequestsByEmployee);
});

//a single request
router.get("/requests/:id", (req, res) => {
	validateAuth({ req, res }, 0, RequestController.getRequest);
});

//delete
//a single request
router.delete("/requests/:id", (req, res) => {
	validateAuth({ req, res }, 1, RequestController.deleteRequest);
});

module.exports = router;