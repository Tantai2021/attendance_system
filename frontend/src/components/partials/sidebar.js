import { Nav, NavItem } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
const Sidebar = () => {
    return (
        <div className="sidebar bg-light text-dark vh-100 p-3">
            <h4 className="mb-4"> Thanh Menu</h4>
            <Nav className="flex-column">
                <Nav.Item>
                    <Nav.Link as={Link} to="/schedules" className="text-dark fs-5">📅 Lịch giảng dạy</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/auth/login" className="text-dark fs-5">Đăng nhập</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/auth/register" className="text-dark fs-5">Đăng ký</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/auth/logout" className="text-dark fs-5">Đăng xuất</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
};
export default Sidebar;