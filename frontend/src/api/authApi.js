import axios from "./axiosClient";

const AuthApi = {
    handleLogin: async (pathname, formData) => {
        try {
            const response = await axios.post(pathname, formData);
            return response;
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu: ", error);
            return {};
        }
    }

};
export default AuthApi;