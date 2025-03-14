const models = require("../models/index");

const ScheduleController = {
    getAllSchedule: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const offset = (page - 1) * limit;

            const { count, rows: schedules } = await models.Schedule.findAndCountAll({
                include: [
                    { model: models.Lecturer, attributes: ["full_name"] },
                    { model: models.Subject, attributes: ["subject_code", "subject_name", "total_sessions"] }
                ],
                limit: limit,
                offset: offset,
            });

            const totalPage = Math.ceil(count / limit);

            if (schedules)
                res.json({
                    totalItems: count,
                    totalPage: totalPage,
                    currentPage: page,
                    schedules: schedules
                });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Lỗi server" });
        }
    },
    getScheduleDetail: async (req, res) => {
        try {
            const scheduleId = req.params.id;
            const attendance = await models.Attendance.findAll({
                where: { schedule_id: scheduleId },
                include: [
                    {
                        model: models.Student, // Liên kết với bảng students
                        as: "student",
                        attributes: ["student_id", "full_name", "gender", "class", "major", "faculty"]
                    }
                ]
            });
            if (attendance) {
                return res.json(attendance);
            } else {
                return res.json({ message: "Không tìm thấy bản điểm danh" });
            }
        } catch (error) {

        }
    },
    addStudentInSchedule: async (req, res) => {
        try {

        } catch (error) {

        }
    }
}
module.exports = ScheduleController;