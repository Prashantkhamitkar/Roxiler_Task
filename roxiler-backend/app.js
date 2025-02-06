
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const apiRoutes = require("./routes/api");


dotenv.config();


const app = express();


app.use(cors());
app.use(express.json()); 


app.use("/api", apiRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

module.exports = app;
