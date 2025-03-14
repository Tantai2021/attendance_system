import { useState } from "react";
import { Button, Form, Card, Container, Toast, ToastContainer, Alert } from 'react-bootstrap';

const RegisterPage = () => {
    const [formData, setFormData] = useState([]);

    const handleChange = () => {

    };
    const handleSubmit = () => {

    };
    return <>
        <Container className="d-flex align-items-center">
            <Card className="shadow-lg p-4" style={{ width: "400px", borderRadius: "12px" }}>
                <Card.Title className="text-center mb-4">Đăng ký</Card.Title>
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
    </>;
}
export default RegisterPage;