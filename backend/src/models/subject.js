const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Subject = sequelize.define("subjects", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subject_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    subject_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    credits: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_sessions: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true, // Tự động tạo created_at & updated_at
    underscored: true, // Chuyển camelCase thành snake_case
});



module.exports = Subject;
