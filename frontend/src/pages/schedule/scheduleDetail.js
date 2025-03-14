import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/scheduleApi";
import { Table, Button } from "react-bootstrap";
import { CgAddR } from "react-icons/cg";

const ScheduleDetail = () => {
    const id = useParams();
    const navigate = useNavigate();
    const [schedules, setSchedules] = useState([]);
    useEffect(() => {
        const fetchScheduleDetail = async () => {
            try {
                const response = await axios.getScheduleDetail(id);
                if (response) {
                    setSchedules(response);
                }
            } catch (error) {
            }
        };
        fetchScheduleDetail();
    }, []);

    const handleViewAddStudentPage = () => {
        navigate("/schedules/add");
    };

    return <>
        <h2 className="text-center">Danh Sách Sinh Viên Trong Buổi Học</h2>
        <Button variant="success" className="mb-3" onClick={handleViewAddStudentPage}><CgAddR className="fs-3" /></Button>
        <Table striped bordered hover>
            <thead>
                <tr className="text-center align-middle">
                    <th>Mã Sinh Viên</th>
                    <th>Họ và Tên</th>
                    <th>Giới Tính</th>
                    <th>Lớp</th>
                    <th>Ngành</th>
                    <th>Trạng thái</th>
                    <th>Khoa</th>
                </tr>
            </thead>
            <tbody>
                {schedules.length > 0 ? (
                    schedules.map((schedule, index) => (
                        <tr key={`student-${index}`} className="text-center align-middle">
                            <td>{schedule.student.student_id}</td>
                            <td>{schedule.student.full_name}</td>
                            <td>{schedule.student.gender}</td>
                            <td>{schedule.student.class}</td>
                            <td>{schedule.student.major}</td>
                            <td>{schedule.status}</td>
                            <td>{schedule.student.faculty}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center">Không có sinh viên nào</td>
                    </tr>
                )}
            </tbody>
        </Table>
    </>;
}
export default ScheduleDetail;