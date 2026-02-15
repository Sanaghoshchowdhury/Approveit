const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ApproveIt Backend Running 🚀");
});

app.use("/api/students", studentRoutes);

module.exports = app;
