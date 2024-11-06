import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dalogin } from "../../reducers/authSlice";
import './register.css';

const RegisterLogin = () => {
    // Register
    const [formData, setFormData] = useState({
        User_Name: '',
        Email: '',
        Password: '',
        Phone: ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [shouldSubmit, setShouldSubmit] = useState(false);
    
    // Login
    const [loginMessage, setLoginMessage] = useState(''); // Thêm trạng thái cho thông báo lỗi đăng nhập
    const userNameRef = useRef();
    const pwRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.Password !== confirmPassword) {
            setMessage('Mật khẩu và xác nhận mật khẩu không khớp!');
            return;
        }
        setShouldSubmit(true);
    };

    useEffect(() => {
        const registerUser = async () => {
            const url = "http://localhost:3000/auth/register";
            const opt = {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            };

            try {
                const response = await fetch(url, opt);
                const data = await response.json();
                setMessage(data.message);
                if (response.ok) {
                    setFormData({ User_Name: '', Email: '', Password: '', Phone: '' });
                    setConfirmPassword('');
                    alert('Vui lòng nhập đủ thông tin!');
                    setIsRightPanelActive(false);
                }
            } catch (error) {
                setMessage('Có lỗi xảy ra, vui lòng thử lại.');
            } finally {
                setShouldSubmit(false);
            }
        };

        if (shouldSubmit) {
            registerUser();
        }
    }, [shouldSubmit, formData]);

    const submitDuLieu = (event) => {
        event.preventDefault();
        if (userNameRef.current.value === "" || pwRef.current.value === "") {
            setLoginMessage("Vui lòng nhập đủ thông tin!");
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
                    localStorage.setItem('token', data.token);
                    dispatch(dalogin(data));
                    navigate('/admin');
                } else if (data.tokenUser) {
                    localStorage.setItem('tokenUser', data.tokenUser);
                    dispatch(dalogin(data));
                    navigate('/');
                } {
                    setLoginMessage(data.message || "Đăng nhập thất bại, vui lòng thử lại!");
                }
            })
            .catch(error => {
                console.error("Đã xảy ra lỗi:", error);
                setLoginMessage("Có lỗi xảy ra, vui lòng thử lại!");
            });
    };

    // Xử lý chuyển đổi giữa các panel
    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
        setMessage('');
        setLoginMessage(''); // Xóa thông báo lỗi đăng nhập khi chuyển panel
    };
    const handleSignInClick = () => {
        setIsRightPanelActive(false);
        setMessage('');
        setLoginMessage(''); // Xóa thông báo lỗi đăng nhập khi chuyển panel
    };

    return (
        <div className={`container_register ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={handleSubmit} className="form">
                    {message && <p className="message">{message}</p>}
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
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
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
            </div>
            <div className="form-container sign-in-container">
                <form action="#" onSubmit={submitDuLieu} className="form">
                    {loginMessage && <p className="message">{loginMessage}</p>}
                    <h1>Đăng nhập</h1>
                    <input
                        type="text"
                        placeholder="UserName"
                        ref={userNameRef}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        ref={pwRef}
                        required
                    />
                    <Link to='/forgot-password'>Forgot your password?</Link>
                    <button className='button_register' type="submit">Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Chào bạn!</h1>
                        <p>Vui lòng đăng ký tài khoản để mua hàng</p>
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
