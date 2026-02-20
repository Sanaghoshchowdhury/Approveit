const express = require("express");
const router = express.Router();

const {
  teacherLogin
} = require("../controllers/facultyController");

router.post("/login", teacherLogin);

module.exports = router;
