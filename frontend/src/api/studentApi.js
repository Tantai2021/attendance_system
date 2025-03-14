import axios from "./axiosClient";

const endpoint = "/students";

const studentApi = {
    getAllStudent: async (req, res) => {
        try {
            const students = await axios.get(endpoint);
            console.log(students);
            return students ? students.lenth > 0 : [];
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sinh viên", error);
            return [];
        }
    }
};
export default studentApi;