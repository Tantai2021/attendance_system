const models = require("../models/index");

const StudentController = {
    getAllStudent: async (req, res) => {
        try {
            const students = await models.Student.findAll();
            if (students.length === 0) {
                return res.status(404).json({ message: "Không có sinh viên nào trong hệ thống!" });
            }
            return res.json(students);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sinh viên:", error);
            return res.status(500).json({ error: "Lỗi server!" });
        }
    }
};
module.exports = StudentController;