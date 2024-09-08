// Schemas
const { User } = require("../models/User");
const { Employee } = require("../models/Employee");
const {hash, validate} = require("../middleware/hash");
const jwt = require("jsonwebtoken");

const createUser = async (data) => {
	try {
		//hash the password before adding the record to the DB
		data.password = await hash(data.password);
		const newUser = await User.create(data);
		return newUser;
	} catch (e) {
		throw new Error(e);
	}
};

const login = async (data) => {
	try {
		const curUser = await User.findOne({where: { username: data.username }});
		if (!curUser) return "";

		const isValid = await validate(data.password, curUser.password);

		if (!isValid) return "";

		const token = jwt.sign({
			username: curUser.username,
			role: curUser.role
		}, process.env.MY_SECRET, { expiresIn: "300s" });
		return token;
	} catch (e) {
		throw new Error(e);
	}
};

const getUsers = async () => {
	try {
		const users = await User.findAll();
		return users;
	} catch (e) {
		throw new Error(e);
	}
};

const getUser = async (id) => {
	try {
		const user = await User.findByPk(id, {include: Employee} );
		return user;
	} catch (e) {
		throw new Error(e);
	}
};

const updateUser = async (id, data) => {
	try {
		//in case of password update, hash the password
		if(data.password !== null) data.password = await hash(data.password);
		const user = await User.update(data, { where:{id} });
		return user;
	} catch (e) {
		throw new Error(e);
	}
};

const deleteUser = async (id) => {
	try {
		const user = await User.destroy({ where:{id} });
		return user;
	} catch (e) {
		throw new Error(e);
	}
};

module.exports = {
	createUser,
	login,
	getUsers,
	getUser,
    updateUser,
    deleteUser
};