import studentApi from "../../api/studentApi";
import { useEffect, useState } from "react";

const AddStudentPage = () => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchStudents = async (req, res) => {
            const reponse = await studentApi.getAllStudent();
            console.log(reponse);
        };
        fetchStudents();
    }, []);
};
export default AddStudentPage;