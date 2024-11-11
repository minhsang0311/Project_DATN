import React, { useState, Fragment } from 'react';
import axios from 'axios';
import '../styles/components/Contact.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from './Banner';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/user/contact', {
                name,
                email,
                message
            });
            setResponseMessage(response.data.message);
        } catch (error) {
            setResponseMessage(error.response ? error.response.data.message : 'Có lỗi xảy ra.');
        }
    };

    return (
        <Fragment>
            <Header />
            <Banner />
            <div className="contact-page">
                <div className="contact-info">
                    <div className="contact-details">
                        <p>
                            <i className="fa fa-map-marker"></i>
                            Trường Cao đẳng FPT Polytechnic
                        </p>
                        <p>
                            <i className="fa fa-phone"></i>
                            077718379
                        </p>
                        <p>
                            <i className="fa fa-envelope"></i>
                            quocdat100322@gamil.com
                        </p>
                    </div>
                    <h2>Liên hệ với chúng tôi</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">Họ và tên</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Họ và tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="message">Nội dung</label>
                        <textarea
                            id="message"
                            placeholder="Nội dung"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                        <button type="submit">Gửi liên hệ</button>
                    </form>
                    {responseMessage && <p>{responseMessage}</p>}
                </div>

                <div className="map-container">
                    <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.120454512488!2d105.81439461424586!3d21.028179985998927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8346a2b2f9%3A0x50cda8f7fd1602f8!2zMjY2IMSQ4buZIEPDoG4sIFBoxrDhu51uZyBMacOqbiBHaWFpLCBCw6AgxJDhu5FuZywgSMOgIE7hurVu!5e0!3m2!1sen!2s!4v1618891188283!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default Contact;
