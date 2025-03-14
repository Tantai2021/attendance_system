const express = require("express");
const { getStudentsBySession } = require("../controllers/attendanceController");

const router = express.Router();

router.get("/session/:schedule_id", getStudentsBySession);

module.exports = router;
