// Managers
const UserManager = require("../managers/UserManager");

const createUser = async (req, res) => {
	const data = req.body;
	try {
		const newUser = await UserManager.createUser(data);
		return res.status(201).send(newUser);
	} catch (e) {
		return res.status(500).send({ message: e.message });
	}
};

const login = async (req, res) => {
	const data = req.body;
	try {
		const response = await UserManager.login(data);
		if (response === null || (response !== null && response.token === ""))
            return res.status(401).send({ message: "invalid authentication" });
		else {
			//Sign the cookie with the JWT
			res.cookie("token", response.token, {
				httpOnly: true,
                /*secure: true,
                signed: true,
                maxAge: 100000,*/
			});
			return res.status(200).send({
				token: response.token,
				message: "success",
				user: {
					name: response.user.username,
					role: response.user.role,
					employeeId: response.user.employeeId
				}
			});
		}
	} catch (e) {
		return res.status(500).send({ message: e.message });
	}
};

const getUsers = async (req, res) => {
	try {
		const users = await UserManager.getUsers();
		return res.status(200).send(users);
	} catch (e) {
		return res.status(500).send({ message: e.message });
	}
};
const getUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await UserManager.getUser(id);
		return res.status(200).send(user);
	} catch (e) {
		return res.status(500).send({ message: e.message });
	}
};

const getUserByEmployee = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await UserManager.getUserByEmployee(id);
		return res.status(200).send(user);
	} catch (e) {
		return res.status(500).send({ message: e.message });
	}
};
const updateUser = async (req, res) => {
	const { id } = req.params;
	const data = req.body;
	try {
		const user = await UserManager.updateUser(id, data);
		return res.status(200).send(user);
	} catch (e) {
		return res.status(500).send({ message: e.message });
	}
};
const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		await UserManager.deleteUser(id);
		return res.sendStatus(200);
	} catch (e) {
		return res.status(500).send({ message: e.message });
	}
};

module.exports = {
	createUser,
    login,
	getUsers,
	getUser,
	getUserByEmployee,
	updateUser,
	deleteUser
};