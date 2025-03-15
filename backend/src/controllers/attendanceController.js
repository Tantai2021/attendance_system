const models = require("../models/index");

const AttendanceController = {
    addStudent: async (req, res) => {
        try {
            const { schedule_id, student_id } = req.body;
            console.log("BODY: ", req.body);

            if (!schedule_id || !student_id) {
                return res.json({ message: "Thiếu schedule_id hoặc student_id" });
            }
            const schedule = await models.Schedule.findOne({
                where: { id: schedule_id }
            });
            const student = await models.Student.findOne({
                where: { student_id: student_id }
            });
            const newEntry = await models.Attendance.create({
                student_id: student.id,
                schedule_id: schedule.id,
                attendance_date: schedule.day_of_week,
                status: "None"
            });
            if (newEntry) {
                res.json({
                    message: "Thêm sinh viên vào buổi học thành công"
                })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Lỗi server" });
        }
    }
};
module.exports = AttendanceController;