import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Button onClick={() => navigate(- 1)} className="m-2">
            <IoIosArrowBack className="fs-4" />
        </Button >
    );
};
export default BackButton;