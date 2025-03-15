const express = require("express");
const router = express.Router();

const AttendanceController = require("../controllers/attendanceController");

router.post("/addStudent", AttendanceController.addStudent);

module.exports = router;
