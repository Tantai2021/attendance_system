import axios from "./axiosClient";

const endpoint = "/schedules";

const scheduleApi = {
    getAllSchedule: async (currentPage = 1, lecturer_id) => {
        try {
            const response = await axios.get(endpoint, {
                params: {
                    page: currentPage,
                    lecturer_id: lecturer_id
                }
            });
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
    },
    findStudentsInSchedule: async (slug, searchQuery = "") => {
        try {
            let schedules;
            if (searchQuery.trim() !== "") {
                schedules = await axios.get(`${endpoint}/${slug}/search`, { params: { q: searchQuery } });
            } else {
                schedules = await axios.get(`${endpoint}/${slug}`);
            }
            return schedules || [];
        } catch (error) {
            console.error("Lỗi khi tìm sinh viên", error);
            return [];
        }
    },
};
export default scheduleApi;