import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/components/resetPassword.css';  // Cập nhật đường dẫn đến file CSS của bạn nếu cần

const ResetPassword = () => {
    const { token } = useParams();  // Lấy token từ URL
    const navigate = useNavigate();  // Để điều hướng người dùng sau khi reset mật khẩu
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Mật khẩu không khớp, vui lòng thử lại.');
            return;
        }

        setLoading(true); // Bắt đầu quá trình gửi yêu cầu
        try {
            const response = await axios.post(
                `http://localhost:3000/user/reset-password/${token}`, 
                { newPassword }
            );
            setMessage(response.data.message); // Hiển thị thông báo thành công
            navigate('/register_login'); // Chuyển hướng người dùng đến trang đăng nhập
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Có lỗi xảy ra.');
        } finally {
            setLoading(false); // Kết thúc quá trình gửi yêu cầu
        }
    };

    return (
        <div className="reset_password">
            <h2>Đặt lại mật khẩu</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Xác nhận mật khẩu mới"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
