import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dalogin } from "../../reducers/authSlice";

function DangNhap() {
    const userNameRef = useRef();
    const pwRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra token từ localStorage khi tải lại trang
        const token = localStorage.getItem('token');
        if (token) {
            const checkTokenUrl = "http://localhost:3000/auth/check-token";
            fetch(checkTokenUrl, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.valid) {
                        dispatch(dalogin({ token })); // Lưu token vào Redux state
                        navigate('/admin'); // Điều hướng đến trang admin
                    } else {
                        localStorage.removeItem('token'); // Xóa token nếu không hợp lệ
                    }
                })
                .catch(error => console.error("Đã xảy ra lỗi:", error));
        }
    }, [dispatch, navigate]);

    const submitDuLieu = (event) => {
        event.preventDefault();
        if (userNameRef.current.value === "" || pwRef.current.value === "") {
            alert("Nhập đủ thông tin nhé bạn ơi!");
            return;
        }

        const url = "http://localhost:3000/auth/login";
        const tt = { User_Name: userNameRef.current.value, Password: pwRef.current.value };
        const opt = {
            method: "POST",
            body: JSON.stringify(tt),
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token); // Lưu token vào localStorage
                    dispatch(dalogin(data)); // Lưu token vào Redux state
                    navigate('/admin'); // Điều hướng đến trang admin
                } else {
                    alert(data.message || "Đăng nhập thất bại, vui lòng thử lại!");
                }
            })
            .catch(error => console.error("Đã xảy ra lỗi:", error));
    };

    return (
        <form id="frmlogin" className="col-7 m-auto mt-3 border border-danger" onSubmit={submitDuLieu}>
            <h2 className="bg-danger-subtle h5 p-2">Thành viên đăng nhập</h2>
            <div className="m-3">Tên đăng nhập
                <input
                    className="form-control shadow-none border-danger-subtle"
                    type="text"
                    ref={userNameRef}
                    required
                />
            </div>
            <div className="m-3">Mật khẩu
                <input
                    className="form-control shadow-none border-danger-subtle"
                    type="password"
                    ref={pwRef}
                    required
                />
            </div>
            <div className="m-3">
                <button type="submit" className="btn btn-danger px-3">Đăng nhập</button>
            </div>
        </form>
    );
}

export default DangNhap;
