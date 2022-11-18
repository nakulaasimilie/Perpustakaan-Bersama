const express = require("express");
const PORT = 2000;
const server = express();
const db = require("./models");
const cors = require("cors")
const bearerToken = require("express-bearer-token");


require("dotenv").config()

server.use(express.json());
server.use(cors());
server.use(express.static("./Public"));
server.use(bearerToken());

const { bookRoutes, userRoutes, adminRoutes } = require("./routers");
server.use("/book", bookRoutes);
server.use("/user", userRoutes);
server.use("/admin", adminRoutes);

server.listen(PORT, () => {
    // db.sequelize.sync({ alter: true });
    console.log("Success Running at PORT: " + PORT);
});