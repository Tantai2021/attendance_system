const express = require('express');
const StudentController = require("../controllers/studentController");
const router = express.Router();

router.get("/", StudentController.getAllStudent);

module.exports = router;