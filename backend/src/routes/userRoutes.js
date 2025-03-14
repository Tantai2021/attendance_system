const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import model User

// Lấy danh sách sinh viên
router.get('/students', async (req, res) => {
    try {
        const students = await User.findAll({
            where: { role: 'student' } // Lọc theo role sinh viên
        });
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi server!' });
    }
});

module.exports = router;
