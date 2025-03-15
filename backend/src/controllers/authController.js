const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { Lecturer, Student } = require("../models");

const SECRET_KEY = "123456789";
const authController = {
    getUser: async (email, password) => {
        const user = await User.findOne({
            where: { email }
        });
        console.log("USER: ", user)
        try {
            if (user) {
                const isMatch = await authController.checkPassword(password, user.password);
                if (isMatch) {
                    const lecturer = await Lecturer.findOne({
                        where: { email: user.email }
                    })
                    const student = await Student.findOne({
                        where: { email: user.email }
                    })
                    console.log(student);

                    let userInfo = {
                        ...user.toJSON(),
                        info: null // Giá trị mặc định nếu không tìm thấy
                    };
                    if (lecturer) {
                        userInfo.info = lecturer.toJSON();
                    } else if (student) {
                        userInfo.info = student.toJSON();
                    }
                    return {
                        token: authController.generateToken(userInfo),
                    };
                } else
                    return { error: "Mật khẩu không chính xác" }
            } else
                return { error: "Tài khoản không tồn tại" };
        } catch (error) {
            console.error("Lỗi đăng nhập: ", error);
            return { error: "Lỗi server, vui lòng thử lại sau" }
        }

    },
    checkPassword: async (password, userPassword) => {
        return await bcrypt.compare(password, userPassword);
    },
    generateToken: (user) => {
        const token = jwt.sign(
            user,
            SECRET_KEY,
            { expiresIn: "1h" }
        );
        return token
    }
};

module.exports = authController;