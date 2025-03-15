const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Attendance = sequelize.define("attendances", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    schedule_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    attendance_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("Present", "Absent", "Late"),
        allowNull: false
    },
}, {
    timestamps: true, // Tự động thêm created_at & updated_at
    underscored: true, // Chuyển camelCase thành snake_case
});


module.exports = Attendance;
