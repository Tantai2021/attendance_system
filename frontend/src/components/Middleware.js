import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathLecturer = ["/schedules"];
    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            navigate("/auth/login");
            return;
        }
        const user = jwtDecode(authToken);
        if (pathLecturer.includes(location.pathname) && user.role !== "lecturer") {
            navigate("/unauthorized"); // Chuyển hướng đến trang không có quyền truy cập
        }
    }, [navigate]);
};
export default CheckLogin;