import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

// PARTIALS
import Header from "../components/partials/navbar";
import Sidebar from "../components/partials/sidebar";

// PAGE
import Schedule from "../pages/schedule/scheduleList";
import ScheduleDetail from "../pages/schedule/scheduleDetail";
import AddStudentSchedule from "../pages/schedule/addStudent";

import AuthLogin from "../pages/auth/login";
import AuthRegister from "../pages/auth/register";
import AuthLogout from "../pages/auth/logout";

const AppRoutes = () => {
    return (
        <Router>
            <Header />
            <Container>
                <Row>
                    <Col xs={3} className="bg-light vh-100">
                        <Sidebar />
                    </Col>
                    <Col xs={9} className="p-4">
                        <Routes>
                            <Route path="/schedules" element={<Schedule />} />
                            <Route path="/schedules/:id" element={<ScheduleDetail />} />
                            <Route path="/schedules/add" element={<AddStudentSchedule />} />

                            <Route path="/auth/login" element={<AuthLogin />} />
                            <Route path="/auth/register" element={<AuthRegister />} />
                            <Route path="/auth/logout" element={<AuthLogout />} />
                        </Routes>
                    </Col>
                </Row>
            </Container >
        </Router>
    );
};
export default AppRoutes;