const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Student = sequelize.define("students", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    student_id: { type: DataTypes.STRING, allowNull: false, unique: true },
    full_name: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.ENUM("Male", "Female", "Other"), allowNull: false },
    birth_place: { type: DataTypes.STRING, allowNull: false },
    class: { type: DataTypes.STRING, allowNull: false },
    major: { type: DataTypes.STRING, allowNull: false },
    faculty: { type: DataTypes.STRING, allowNull: false },
    education_program: { type: DataTypes.STRING, allowNull: false },
    course_year: { type: DataTypes.INTEGER, allowNull: false },
    advisor: { type: DataTypes.STRING, allowNull: true }
}, { timestamps: true, underscored: true });


module.exports = Student;
