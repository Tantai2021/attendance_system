const sequelize = require("../config/database");

const Lecturer = require("./lecturer");
const Subject = require("./subject");
const Attendance = require("./attendance");
const Schedule = require("./schedule");
const Student = require("./student");
const User = require("./user");

// Định nghĩa mối quan hệ

// Quan hệ: Điểm danh thuộc về một sinh viên
Attendance.belongsTo(Student, { foreignKey: "student_id", onDelete: "CASCADE" });

// Quan hệ: Điểm danh thuộc về một lịch học
Attendance.belongsTo(Schedule, { foreignKey: "schedule_id", onDelete: "CASCADE" });

Lecturer.hasMany(Schedule, { foreignKey: "lecturer_id", onDelete: "CASCADE" });
Lecturer.hasOne(User, { foreignKey: "lecturer_id", onDelete: "CASCADE" });


// Quan hệ: Lịch học thuộc về một giảng viên
Schedule.belongsTo(Lecturer, { foreignKey: "lecturer_id", onDelete: "CASCADE" });

// Quan hệ: Lịch học thuộc về một môn học
Schedule.belongsTo(Subject, { foreignKey: "subject_id", onDelete: "CASCADE" });

// Quan hệ: Một lịch học có nhiều lượt điểm danh
Schedule.hasMany(Attendance, { foreignKey: "schedule_id", onDelete: "CASCADE" });

// Quan hệ: Sinh viên có nhiều điểm danh
Student.hasMany(Attendance, { foreignKey: "student_id", onDelete: "CASCADE" });
Student.hasOne(User, { foreignKey: "student_id", onDelete: "CASCADE" });

Subject.hasMany(Schedule, { foreignKey: "subject_id", onDelete: "CASCADE" });

// Quan hệ: User có thể liên kết với sinh viên hoặc giảng viên
User.belongsTo(Student, { foreignKey: "student_id", onDelete: "CASCADE" });
User.belongsTo(Lecturer, { foreignKey: "lecturer_id", onDelete: "CASCADE" });

module.exports = { sequelize, Lecturer, Subject, Attendance, Schedule, Student, User };
