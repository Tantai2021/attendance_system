const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt")

const Student = require("./student");
const Lecturer = require("./lecturer");

const User = sequelize.define("users", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
        type: DataTypes.ENUM("student", "lecturer", "admin"),
        allowNull: false
    },
    student_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: Student, key: "id" } },
    lecturer_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: Lecturer, key: "id" } }
}, {
    timestamps: true,
    underscored: true,
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }
});



module.exports = User;
