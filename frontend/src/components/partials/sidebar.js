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
            </Nav>
        </div>
    );
};
export default Sidebar;