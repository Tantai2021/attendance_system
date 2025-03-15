import axios from "./axiosClient";

const endpoint = "/students";

const studentApi = {
    getAllStudents: async () => {
        try {
            const students = await axios.get(endpoint);
            return students ? students : [];
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sinh viên", error);
            return [];
        }
    },
    getStudentByConditions: async (searchQuery = "") => {
        try {
            let students;
            if (searchQuery.trim() !== "") {
                students = await axios.get(`${endpoint}/search`, { params: { q: searchQuery } });
            } else {
                students = await axios.get(endpoint);
            }
            return students || [];
        } catch (error) {
            console.error("Lỗi khi tìm sinh viên", error);
            return [];
        }
    },
};
export default studentApi;