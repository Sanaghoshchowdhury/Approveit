const express = require("express");
const router = express.Router();

const facultyController = require("../controllers/facultyController");

router.post("/signup", facultyController.signup);
router.post("/login", facultyController.login);
router.put("/update-status/:id", facultyController.updateStatus);
router.get("/requests", facultyController.getAllRequests);

module.exports = router;