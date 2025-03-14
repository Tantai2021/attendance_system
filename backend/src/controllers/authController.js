const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { Lecturer } = require("../models");

const SECRET_KEY = "123456789";
const authController = {
    getUser: async (email, password) => {
        try {
            const user = await User.findOne({
                where: { email }
            });
            if (user) {
                if (user.role === "lecturer") {
                    const isMatch = await authController.checkPassword(password, user.password);
                    const lecturer = await Lecturer.findOne({
                        where: { email: user.email }
                    })
                    if (isMatch) {
                        const userInfo = {
                            ...user.toJSON(),
                            info: lecturer ? lecturer.toJSON() : null
                        };
                        return {
                            token: authController.generateToken(userInfo),
                        };
                    } else
                        return { error: "Mật khẩu không chính xác" }
                } else
                    return { error: "Chỉ giảng viên mới có thể truy cập" };
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