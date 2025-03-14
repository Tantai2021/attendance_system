import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        try {
            const token = localStorage.getItem("authToken");
            if (token) {
                const userLoggedIn = jwtDecode(token);
                console.log(userLoggedIn)
                setUser(userLoggedIn);
            }
        } catch (error) {
            console.error("Lỗi khi giải mã JWT:", error);
            localStorage.removeItem("authToken"); // Xóa token lỗi
            navigate("/auth/login"); // Điều hướng về trang đăng nhập
        }
    }, [navigate]);
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        navigate("/auth/login");
    };
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home" className="text-white">Attendance System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {user ? (
                            <NavDropdown title={user.info.full_name} id="user-nav-dropdown">
                                <NavDropdown.Item href="/profile">Hồ sơ</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link href="/auth/login">Đăng nhập</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
