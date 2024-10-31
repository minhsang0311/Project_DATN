import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
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
        <div>
            <h2>Đặt lại mật khẩu</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Đặt lại mật khẩu</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
