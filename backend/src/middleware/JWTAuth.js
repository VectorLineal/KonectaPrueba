const jwt = require("jsonwebtoken");

const getRank = (role) =>{
    switch(role){
        case "empleado":
        default:
            return 0;
        case "administrador":
            return 1;
    }
}

exports.validateAuth = async ({ req, res }, rank, callback) => {
	let token = req.cookies.token;
    if(token == null) token = req.headers.authorization;
	try {
		const user = jwt.verify(token, process.env.MY_SECRET);
		req.user = user;
        const curRank = getRank(user.role);
        if(curRank >= rank){
            if (callback) await callback(req, res);
            else res.status(404).send({ message: "Service Not found" });
        }
        else res.status(403).send({ message: "The current user doesn't have the necesary permissions" });
		
	} catch (err) {
		res.clearCookie("token");
		res.status(401).send({ message: "Required authentication" });
	}
};