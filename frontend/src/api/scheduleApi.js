import axios from "./axiosClient";

const endpoint = "/schedules";

const scheduleApi = {
    getAllSchedule: async (currentPage = 1) => {
        try {
            const response = await axios.get(endpoint, { params: { page: currentPage } });
            return response ? response : [];
        } catch (error) {
            console.error("Lỗi lấy danh sách lịch học:", error);
            return [];
        }
    },
    getScheduleDetail: async (slug) => {
        try {
            const response = await axios.get(`${endpoint}/${slug.id}`);
            return response ? response : {};
        } catch (error) {
            console.error("Lỗi lấy lịch học:", error);
            return {};
        }
    }

};
export default scheduleApi;