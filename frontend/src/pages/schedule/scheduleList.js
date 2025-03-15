import { useEffect, useState } from "react";
import scheduleApi from "../../api/scheduleApi";
import Middleware from "../../components/Middleware";

import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ScheduleList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(1);
    const queryParams = new URLSearchParams(location.search);

    const [currentPage, setCurrentPage] = useState(() => {
        return parseInt(queryParams.get("page")) || 1;
    });

    useEffect(() => {
        const getPage = parseInt(new URLSearchParams(location.search).get('page')) || 1;
        if (getPage !== currentPage) {
            setCurrentPage(getPage);
        }
    }, [location.search, currentPage]);


    useEffect(() => {
        const fetchSchedules = async () => {
            setLoading(true);
            const user = jwtDecode(localStorage.getItem("authToken"));
            try {
                const data = await scheduleApi.getAllSchedule(currentPage, user.lecturer_id);
                if (data) {
                    setSchedules(data.schedules);
                    setTotalPage(data.totalPage);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách lịch học: ", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentPage) fetchSchedules();
    }, [currentPage]); // Chỉ gọi API khi `currentPage` thay đổi


    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    const handlePageClick = (event) => {
        const newPage = event.selected + 1;
        if (newPage !== currentPage) {
            navigate({
                pathname: location.pathname,
                search: `?page=${newPage}`
            });
        }
    };

    const handleViewSchedule = (scheduleId) => {
        navigate(location.pathname + "/" + scheduleId);
    };
    return (
        <>
            <Middleware />
            <Table striped bordered hover>
                <thead>
                    <tr className="text-center align-middle">
                        <th>Tên môn học</th>
                        <th>Mã môn học</th>
                        <th>Giảng viên</th>
                        <th>Ngày bắt đầu</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                        <th>Tổng số buổi</th>
                        <th>Xem chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule, index) => {
                        return <tr key={"schedule-" + index} className="text-center align-middle">
                            <td>{schedule.subject.subject_name}</td>
                            <td>{schedule.subject.subject_code}</td>
                            <td>{schedule.lecturer.full_name}</td>
                            <td>{schedule.day_of_week}</td>
                            <td>{schedule.start_time}</td>
                            <td>{schedule.end_time}</td>
                            <td>{schedule.subject.total_sessions}</td>
                            <td><button className="btn btn-primary" onClick={() => handleViewSchedule(schedule.id)}>
                                Xem
                            </button></td>
                        </tr>
                    })}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Tiếp >"
                previousLabel="< Trước"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPage}
                forcePage={currentPage - 1}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
            />
        </>
    );
};
export default ScheduleList;