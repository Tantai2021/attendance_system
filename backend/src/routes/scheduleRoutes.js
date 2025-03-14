const express = require("express");
const ScheduleController = require("../controllers/scheduleController");
const StudentController = require("../controllers/studentController");
const router = express.Router();

router.get("/", ScheduleController.getAllSchedule);
router.get("/:id", ScheduleController.getScheduleDetail);
router.post("/add", ScheduleController.addStudentInSchedule);
router.get("/add", StudentController.getAllStudent);
module.exports = router;
