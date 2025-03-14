const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Lecturer = sequelize.define("lecturers", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lecturer_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true, // Tự động tạo created_at & updated_at
    underscored: true, // Chuyển camelCase thành snake_case
});



module.exports = Lecturer;

