import studentApi from "../../api/studentApi";
import { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { debounce } from "lodash";
const AddStudentPage = () => {
    const [students, setStudents] = useState([]);
    const [query, setQuery] = useState("");
    useEffect(() => {
        const fetchStudents = async (req, res) => {
            const response = await studentApi.getAllStudents();
            if (response.length > 0) {
                setStudents(response);
            }
        };
        fetchStudents();
    }, []);

    const handleSearch = debounce(async (searchQuery) => {
        try {
            let foundStudent = await studentApi.getStudentByConditions(searchQuery);
            if (foundStudent.length > 0) {
                setStudents(foundStudent);
            }
        } catch (error) {
            console.error("Lỗi khi tìm sinh viên", error);
        }
    }, 300);
    const handleChange = (event) => {
        let query = event.target.value;
        console.log(query)
        setQuery(query);
        handleSearch(query);
    }
    return (
        <>
            <Form.Group className="mb-3 d-flex">
                <Form.Control
                    type="text"
                    name="search"
                    id="inputPassword5"
                    value={query}
                    placeholder="Nhập từ khóa..."
                    onChange={handleChange}
                />
                <Button><FiSearch className="fs-4" /></Button>
            </Form.Group>
            <h3>Danh sách sinh viên</h3>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Mã SV</th>
                        <th>Họ và tên</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Chuyên ngành</th>
                        <th>Lớp</th>
                        <th>Khóa</th>
                        <th>Khoa</th>
                        <th>Cố vấn học tập</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.student_id}</td>
                            <td>{student.full_name}</td>
                            <td>{student.gender}</td>
                            <td>{student.birth_place}</td>
                            <td>{student.major}</td>
                            <td>{student.class}</td>
                            <td>{student.course_year}</td>
                            <td>{student.faculty}</td>
                            <td>{student.advisor}</td>
                            <td><Button variant="primary">Thêm</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>);
};
export default AddStudentPage;