const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

router.post("/signup", studentController.signup);
router.post("/login", studentController.login);
router.post("/create-request", studentController.createRequest);
router.get("/my-requests/:id", studentController.getMyRequests);

module.exports = router;