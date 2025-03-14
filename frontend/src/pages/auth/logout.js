import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("authToken");
        navigate("/auth/login");
    }, [navigate]);
}
export default LogoutPage;