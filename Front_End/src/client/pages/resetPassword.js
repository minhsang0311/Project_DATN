import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/components/resetPassword.css';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Mật khẩu không khớp, vui lòng thử lại.');
            return;
        }

        axios.post(`http://localhost:3000/user/reset-password/${token}`, { newPassword })
            .then(response => {
                setMessage(response.data.message);
                navigate('/register_login');
            })
            .catch(error => {
                setMessage(error.response ? error.response.data.message : 'Có lỗi xảy ra.');
            });
    };

    return (
        <div className='reset_password'>
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
                <button type="submit">Đặt lại mật khẩu</button>
            </form>
        </div>
    );
};

export default ResetPassword;
