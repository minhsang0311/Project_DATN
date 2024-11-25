import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/components/ChangePassword.css'

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const tokenUser = localStorage.getItem("tokenUser");
        const tokenRole = JSON.parse(localStorage.getItem("user"));

        if (!tokenUser) {
            alert('Bạn cần phải đăng nhập để đổi mật khẩu');
            navigate('/register_login');
        } else {
            if (tokenRole.role !== 0) {
                alert('Tài khoản không thể đổi đổi mật khẩu');
                navigate('/register_login');
            }
        }
    }, [navigate]);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (newPassword !== confirmPassword) {
            setError("Mật khẩu mới và xác nhận mật khẩu không đúng.");
            return;
        }

        try {
            // Lấy token từ localStorage
            const tokenUser = localStorage.getItem("tokenUser");

            // Gửi yêu cầu tới API đổi mật khẩu
            const response = await axios.post(
                "http://localhost:3000/user/change-password",
                { oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${tokenUser}` } }
            );

            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            alert("Bạn đã thay đổi mật khẩu thành công!");
            navigate('/register_login');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                setError("Đã xảy ra lỗi khi đổi mật khẩu.");
            }
        }
    };

    return (
        <div className="change-password">
            <h2>Thay đổi mật khẩu</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleChangePassword}>
                <div className="form-group">
                    <label>Mật khẩu cũ:</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu mới:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Xác nhận mật khẩu mới:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="change_pw">Đổi mật khẩu</button>
            </form>
        </div>
    );
};

export default ChangePassword;
