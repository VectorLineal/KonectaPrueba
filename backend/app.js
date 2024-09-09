const express = require('express');
const sanitizer = require("perfect-express-sanitizer");
const cookieParser = require("cookie-parser");
const cors = require('cors');

require("dotenv").config();

const { database } = require("./src/configs/db");

const EmployeeRoutes = require("./src/routes/EmployeeRoutes");
const RequestRoutes = require("./src/routes/RequestRoutes");
const UserRoutes = require("./src/routes/UserRoutes");

const app = express();
const PORT = process.env.PORT;
const corsOptions = {
    origin: 'http://localhost:3000',
    exposedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cookieParser());
app.use(express.json());

//enable cors, only for development, remove on production
app.use(cors(corsOptions));

//enables automatic sanitizer for all app's inputs
app.use(
    sanitizer.clean({
      xss: true,
      noSql: true,
      sql: true,
    })
);

//Routes to the controllers
app.use("/api", EmployeeRoutes);
app.use("/api", RequestRoutes);
app.use("/api", UserRoutes);

app.use("/check", (_, res) => res.status(200).send({ status: "OK", message: "API successfuly initialized" }));

//initialize and syncronize the DB, then start the app
database.authenticate().then(() => {
    console.log('Database connection success');
    return database.sync();
}).then(() => {
    console.log('Syncing models');
    app.listen(PORT, () => {
        console.log("Success: App is listening on port " + PORT);
    });
}).catch((error) => {
    console.error("Connection fail, server can't start", error);
});