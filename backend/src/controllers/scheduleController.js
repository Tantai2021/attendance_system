const models = require("../models/index");
const { Op } = require("sequelize");

const ScheduleController = {
    getAllSchedule: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const offset = (page - 1) * limit;
            const { lecturer_id } = req.query;
            const { count, rows: schedules } = await models.Schedule.findAndCountAll({
                where: { lecturer_id: lecturer_id },
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
    findStudentsInSchedule: async (req, res) => {
        try {
            const { q } = req.query;
            const schedule_id = parseInt(req.params.id); // Chuyển sang số nguyên

            if (isNaN(schedule_id)) {
                return res.status(400).json({ error: "Schedule ID không hợp lệ!" });
            }

            if (!q) {
                return res.status(400).json({ error: "Thiếu thông tin tìm kiếm!" });
            }
            let students = await models.Attendance.findAll({
                where: { schedule_id: schedule_id },
                include: [{
                    model: models.Student,
                    where: {
                        [Op.or]: [
                            { student_id: { [Op.like]: `%${q}%` } },
                            { full_name: { [Op.like]: `%${q}%` } },
                        ]
                    }
                }],
            })
            if (students.length === 0) {
                return res.status(404).json({ error: "Không tìm thấy sinh viên!" });
            }
            console.log("Danh sách sinh viên tìm thấy:", students);

            return res.json(students);
        } catch (error) {
            console.error("Lỗi khi tìm sinh viên:", error);
            return res.status(500).json({ error: "Lỗi server!" });
        }
    }
}
module.exports = ScheduleController;