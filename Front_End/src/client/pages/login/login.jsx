import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                User_Name: username,
                Password: password,
            });

            // Lưu token vào localStorage (hoặc state quản lý)
            localStorage.setItem('token', response.data.token);
            console.log('token', response.data.token);
            
            // Chuyển hướng người dùng
            if (response.data.userInfo.role === 1) {
                navigate('/admin'); 
            } else {
                navigate('/'); // Nếu là người dùng bình thường
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Có lỗi xảy ra, vui lòng thử lại sau.');
            }
        }
    };

    return (
        <div>
            <h2>Đăng Nhập</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Tên đăng nhập:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Mật khẩu:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Đăng Nhập</button>
            </form>
        </div>
    );
};

export default Login;
