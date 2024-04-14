const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3030;

const server = express();

//Import delle routes
const authorRoutes = require("./routes/authors");
const blogpostRoutes = require("./routes/blogpost");
const path = require("path");

//MIDDELWARE
server.use(cors());

server.use(express.json());

//folder uploads w/express.satic middelware
server.use("/uploads", express.static(path.join(__dirname, "./uploads")));

server.use("/", authorRoutes);
server.use("/", blogpostRoutes);

//connessione del database
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on(`error`, console.error.bind(console, "Db connection error!"));
db.once(`open`, () => {
  console.log("Database succesfully connected!");
});

server.listen(PORT, () =>
  console.log(`Server connected and listening on port ${PORT}`)
);
