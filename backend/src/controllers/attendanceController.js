const models = require("../models/index");

const getStudentsBySession = async (req, res) => {
    try {
        const { schedule_id } = req.params;
        const students = await models.Attendance.findAll({
            where: { schedule_id },
            include: [
                { model: models.Student }
            ]
        });

        res.json(students);
    } catch (error) {
        console.error("ERROR: ", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

module.exports = { getStudentsBySession };
