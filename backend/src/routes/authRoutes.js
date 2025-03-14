const express = require('express');
const authController = require("../controllers/authController");
const router = express.Router();

router.post('/login', async (req, res) => {
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    if (!email || !password) {
        return res.json({
            title: "Rất tiếc",
            message: "Tài khoản và mật khẩu không được để trống",
            status: false
        });
    }

    const result = await authController.getUser(email, password);
    if (result.error) {
        return res.json({
            title: "Rất tiếc",
            message: result.error,
            status: false
        });
    }
    return res.json({
        title: "Xin chúc mừng",
        message: "Đăng nhập thành công!",
        token: result.token,
        status: true
    });
});

module.exports = router
