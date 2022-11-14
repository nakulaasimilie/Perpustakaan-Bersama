const express = require("express");
const PORT = 2000;
const server = express();
const db = require("./models");
const cors = require("cors")
const bearerToken = require("express-bearer-token");

require("dotenv").config()

server.use(express.json());
server.use(cors());
// server.use(express.static("./Public"));
// server.use(bearerToken());

console.log("Register")
console.log("Pagination")

// const { productRoutes, userRoutes } = require("./routers");
// server.use("/product", productRoutes);
// server.use("/user", userRoutes);

server.listen(PORT, () => {
    // db.sequelize.sync({ alter: true });
    console.log("Success Running at PORT: " + PORT);
});