
import React, { useState, useEffect, useRef } from 'react';
import { registerUser } from '../../services/authService';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dalogin } from "../../reducers/authSlice";
import './register.css';

const RegisterLogin = () => {
    const [formData, setFormData] = useState({
        User_Name: '',
        Email: '',
        Password: '',
        Phone: ''
    });
    const [message, setMessage] = useState('');
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    // Cập nhật giá trị form khi người dùng nhập liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData);
            setMessage(response.data.message); // Hiển thị thông báo từ server
            setFormData({ User_Name: '', Email: '', Password: '', Phone: '' }); // Reset form sau khi đăng ký thành công
            setIsRightPanelActive(false); // Chuyển về panel đăng nhập sau khi đăng ký
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message); // Hiển thị lỗi từ server
            } else {
                setMessage('Có lỗi xảy ra, vui lòng thử lại.');
            }
        }
    };

    // Xử lý chuyển đổi giữa các panel
    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
        setMessage('');
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
        setMessage('');
    };
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

        const url = "http://localhost:3001/auth/login";
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
        <div className={`container_register ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={handleSubmit} className="form">
                    <h1>Tạo tài khoản</h1>
                    <input
                        type="text"
                        name="User_Name"
                        placeholder='UserName'
                        value={formData.User_Name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="Email"
                        placeholder="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="Password"
                        placeholder="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="Phone"
                        placeholder="Phone"
                        value={formData.Phone}
                        onChange={handleChange}
                        required
                    />
                    <button className='button_register' type="submit">Sign Up</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
            <div className="form-container sign-in-container">
                <form action="#" onSubmit={submitDuLieu}>
                    <h1>Đăng nhập</h1>
                    <input
                    className="form-control shadow-none border-danger-subtle"
                    type="text"
                    ref={userNameRef}
                    required
                />
                    <input
                    className="form-control shadow-none border-danger-subtle"
                    type="password"
                    ref={pwRef}
                    required
                />
                    <a href="/#">Forgot your password?</a>
                    <button className='button_register' type="submit">Sign In</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Chào bạn!</h1>
                        <p>Vui lòng đăng nhập để mua hàng</p>
                        <button className="ghost button_register" onClick={handleSignInClick}>
                            Sign In
                        </button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Chào bạn!</h1>
                        <p>Chào mừng bạn đã quay trở lại với chúng tôi</p>
                        <button className="ghost button_register" onClick={handleSignUpClick}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;
