const express = require('express');
const StudentController = require("../controllers/studentController");
const router = express.Router();

router.get("/", StudentController.getAllStudent);
router.get("/search", StudentController.getStudentByConditions);
module.exports = router;