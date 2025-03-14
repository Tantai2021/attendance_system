const models = require("../models/index");
const { Op } = require("sequelize");

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
    },

    getStudentByConditions: async (req, res) => {
        try {
            const { q } = req.query;
            if (!q) {
                return res.status(400).json({ error: "Thiếu thông tin tìm kiếm!" });
            }
            const conditions = {
                [Op.or]: [
                    { student_id: { [Op.like]: `%${q}%` } },
                    { full_name: { [Op.like]: `%${q}%` } },
                ]
            };

            const students = await models.Student.findAll({
                where: conditions
            });

            if (students.length === 0) {
                return res.status(404).json({ error: "Không tìm thấy sinh viên!" });
            }

            return res.json(students);
        } catch (error) {
            console.error("Lỗi khi tìm sinh viên:", error);
            return res.status(500).json({ error: "Lỗi server!" });
        }
    }
};

module.exports = StudentController;
