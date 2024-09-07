const express = require('express');

require("dotenv").config();

const { database } = require("./src/configs/db");

const app = express();
const PORT = process.env.PORT;

app.use("/", (_, res) => res.status(200).send({ status: "OK", message: "API successfuly initialized" }));


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