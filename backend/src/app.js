const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const adminRoutes = require("./routes/adminRoutes"); 


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ApproveIt Backend Running 🚀");
});

app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/admin", adminRoutes); 



module.exports = app;
