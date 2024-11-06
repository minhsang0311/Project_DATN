import React, { useState } from 'react';
import axios from 'axios';
import '../styles/components/forgotPassword.css'
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/user/forgot-password', { email })
            .then(response => {
                console.log(response)
                setMessage(response.data.message);
            })
            .catch(error => {
                setMessage(error.response ? error.response.data.message : 'Có lỗi xảy ra.', error);
            });
    };

    return (
        <div className='forgot_password'>
            {message && <p>{message}</p>}
            <h2>Quên mật khẩu</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Gửi yêu cầu</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
