const express = require('express');
const sanitizer = require("perfect-express-sanitizer");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const { database } = require("./src/configs/db");

const EmployeeRoutes = require("./src/routes/EmployeeRoutes");
const RequestRoutes = require("./src/routes/RequestRoutes");
const UserRoutes = require("./src/routes/UserRoutes");

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());

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