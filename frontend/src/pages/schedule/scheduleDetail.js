import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/scheduleApi";
import { Table, Button, Form } from "react-bootstrap";
import { CgAddR } from "react-icons/cg";
import { HiArchiveBoxArrowDown } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { debounce } from "lodash";

const ScheduleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [schedules, setSchedules] = useState([]);
    const [query, setQuery] = useState("");
    useEffect(() => {
        const fetchScheduleDetail = async () => {
            try {
                const response = await axios.getScheduleDetail({ id });
                if (response) {
                    setSchedules(response);
                }
            } catch (error) {
                console.error("Lỗi khi xem chi tiết buổi học", error);
            }
        };
        fetchScheduleDetail();
    }, []);
    const handleViewAddStudentPage = () => {
        navigate(`/schedules/${id}/add`);
    };

    const handleSearch = debounce(async (searchQuery) => {
        try {
            let foundSchedules = await axios.findStudentsInSchedule(id, searchQuery);
            console.log(foundSchedules);

            if (foundSchedules.length > 0) {
                setSchedules(foundSchedules);
            }
        } catch (error) {
            console.error("Lỗi khi tìm sinh viên", error);
        }
    }, 300);
    const handleChange = (event) => {
        let query = event.target.value;
        setQuery(query);
        handleSearch(query);
    }

    return <>
        <h2 className="text-center">Danh Sách Sinh Viên Trong Buổi Học</h2>
        <Button className="mb-3" onClick={handleViewAddStudentPage}><CgAddR className="fs-3" /></Button>
        <Form.Group className="mb-3 d-flex">
            <Form.Control
                type="text"
                name="search"
                value={query}
                placeholder="Nhập từ khóa..."
                onChange={handleChange}
            />
            <Button><FiSearch className="fs-4" /></Button>
        </Form.Group>
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