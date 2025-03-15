const express = require("express");
const ScheduleController = require("../controllers/scheduleController");
const StudentController = require("../controllers/studentController");
const router = express.Router();

router.get("/", ScheduleController.getAllSchedule);
router.get("/:id", ScheduleController.getScheduleDetail);
router.get("/:id/search", ScheduleController.findStudentsInSchedule);
router.get("/add", StudentController.getAllStudent);
module.exports = router;
