const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Schedule = sequelize.define("schedules", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lecturer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    class: {
        type: DataTypes.STRING,
        allowNull: false
    },
    day_of_week: {
        type: DataTypes.DATE,
        allowNull: false
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    timestamps: true, // Tự động tạo created_at & updated_at
    underscored: true, // Chuyển camelCase thành snake_case
});


module.exports = Schedule;
