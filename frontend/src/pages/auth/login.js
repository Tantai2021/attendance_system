import { useEffect, useState } from 'react';
import { Button, Form, Card, Container, Toast, ToastContainer } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

import AuthApi from '../../api/authApi';

const LoginPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [toast, setToast] = useState({
        status: false,
        title: "",
        body: "",
        variant: "success"
    });
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsLoggedIn(true);
            const user = jwtDecode(token);
            if (user) {
                if (user.role !== "lecturer") {
                    navigate("/unauth"); // Điều hướng nếu không phải giảng viên
                    return;
                }
                setTimeout(() => {
                    navigate("/schedules");
                }, 700);
            }
        }
    }, [isLoggedIn, navigate]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.email || !formData.password) {
            setIsLoggedIn(false);
            setToast({
                status: true,
                title: "Lỗi",
                body: "Thiếu email hoặc mật khẩu!",
                variant: "danger"
            });
            return;
        }

        try {
            const res = await AuthApi.handleLogin(location.pathname, formData);
            if (res?.status) {
                setToast({
                    status: true,
                    title: res.title,
                    body: res.message,
                    variant: "success"
                });
                setIsLoggedIn(true);
                localStorage.setItem("authToken", res.token);
            } else {
                setToast({
                    status: true,
                    title: res.title,
                    body: res.message || "Đăng nhập thất bại",
                    variant: "danger"
                });
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Error sending data:", error);
            setIsLoggedIn(false);
            setToast({
                status: true,
                title: "Lỗi",
                body: "Có lỗi xảy ra khi gửi dữ liệu!",
                variant: "danger"
            });
        };
    };
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    };

    const toggleToastSuccess = () => setToast({ status: false, title: "", body: "", variant: "success" });

    return (
        <>
            <Container className="d-flex align-items-center">
                <Card className="shadow-lg p-4" style={{ width: "400px", borderRadius: "12px" }}>
                    <Card.Title className="text-center mb-4">Đăng nhập</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Nhập email"
                                className="custom-input"
                                onChange={handleChange}
                                value={formData.email}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Nhập mật khẩu"
                                className="custom-input"
                                onChange={handleChange}
                                value={formData.password}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Đăng nhập
                        </Button>
                    </Form>
                </Card>
            </Container>
            <ToastContainer position='top-end'>
                <Toast show={toast.status} onClose={() => toggleToastSuccess(false)} bg={toast.variant} animation delay={2000} autohide>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">{toast.title}</strong>
                    </Toast.Header>
                    <Toast.Body className='text-light'>{toast.body}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};
export default LoginPage;