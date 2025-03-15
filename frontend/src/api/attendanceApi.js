import axios from "./axiosClient";

const end_ponint = "/attendances"
const AttendanceApi = {
    addStudent: async (data = {}) => {
        try {
            console.log(data)
            const response = await axios.post(`${end_ponint}/addStudent`, data);
            return response;
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu thêm sinh viên vào bảng điểm danh: ", error);
            return null;
        }
    }
};
export default AttendanceApi;