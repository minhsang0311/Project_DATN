import '../styles/components/About.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import React, { Fragment } from 'react';


const About = () => {
    return (
        <Fragment>
            <Header/>
                <div id="About">
                    <img src="assets/img/banner5.jpg" alt="Banner giới thiệu" />

                    <div className="ve-chung-toi">
                        <h2>Về chúng tôi</h2>
                        <p>
                            Chào mừng đến với thế giới đồ gia dụng hiện đại và tiện nghi! Tại <span><b><i>HomeNest</i></b></span>, 
                            chúng tôi tự hào là nhà cung cấp hàng đầu các sản phẩm gia dụng chất lượng cao, 
                            mang đến sự tiện nghi và phong cách cho mọi gia đình.
                        </p>
                    </div>

                    <div className="text-box">
                        <div className="text-item">
                            <h1>Sứ Mệnh Của Chúng Tôi</h1>
                            <p>Chúng tôi luôn nỗ lực mang đến cho khách hàng những sản phẩm đồ gia dụng tiên tiến nhất, giúp tối ưu hóa thời gian và công sức trong sinh hoạt hàng ngày. Sứ mệnh của chúng tôi là trở thành người bạn đồng hành đáng tin cậy trong mỗi gia đình.</p>
                        </div>
                        <div className="text-item">
                            <h1>Cam Kết Chất Lượng</h1>
                            <p>Chất lượng luôn là ưu tiên hàng đầu của chúng tôi. Mỗi sản phẩm đều được kiểm tra kỹ lưỡng trước khi đến tay khách hàng, đảm bảo tính năng và độ bền vượt trội.</p>
                        </div>
                        <div className="text-item">
                            <h1>Dịch Vụ Khách Hàng</h1>
                            <p>Chúng tôi không chỉ cung cấp sản phẩm mà còn hỗ trợ dịch vụ hậu mãi tận tình. Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng lắng nghe và giải quyết mọi thắc mắc của bạn một cách nhanh chóng và hiệu quả.</p>
                        </div>
                    </div>

                    <div className="product-box">
                        <div className="trai">
                            <h1>Sản phẩm của chúng tôi</h1>
                            <ul>
                                <li>Nồi các loại</li>
                                <li>Bếp điện</li>
                                <li>Lò vi sóng</li>
                                <li>Máy hút bụi</li>
                                <li>Máy xay sinh tố</li>
                                <li>Dao</li>
                            </ul>
                        </div>
                        <div className="phai1">
                            {Array.from({ length: 15 }, (_, i) => (
                                <img key={i} src={`assets/img/sp${i + 1}.jpg`} alt={`Sản phẩm ${i + 1}`} />
                            ))}
                        </div>
                    </div>

                    <div className="video">
                        <div className='tieu_de'>
                            <div className='hk'></div>
                            <h1>Khám Phá Bộ Sưu Tập Đồ Gia Dụng 2024</h1>
                        </div>
                        <div class="box_video">
                            <div className='item_video'>
                                <iframe 
                                    width="360" 
                                    height="270" 
                                    src="https://www.youtube.com/embed/Ai6mulEtiSs" 
                                    title="TVC, video quảng cáo đồ gia dụng | by Cáo Multimedia" 
                                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    referrerpolicy="strict-origin-when-cross-origin" 
                                    allowfullscreen>
                                </iframe>    
                            </div>
                            <div className='item_video'>
                                <iframe 
                                    width="360" 
                                    height="270" 
                                    src="https://www.youtube.com/embed/TNB-kOd5PYA" 
                                    title="NHẬP KHẨU ĐỒ GIA DỤNG NHÀ BẾP MÀ BỎ QUA VIDEO NÀY THÌ QUÁ PHÍ!!! (PHẦN 1)" 
                                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerpolicy="strict-origin-when-cross-origin" 
                                    allowfullscreen>
                                </iframe>  
                            </div>
                            <div className='item_video'>
                                <iframe 
                                    width="360" 
                                    height="270" 
                                    src="https://www.youtube.com/embed/TNB-kOd5PYA" 
                                    title="NHẬP KHẨU ĐỒ GIA DỤNG NHÀ BẾP MÀ BỎ QUA VIDEO NÀY THÌ QUÁ PHÍ!!! (PHẦN 1)" 
                                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerpolicy="strict-origin-when-cross-origin" 
                                    allowfullscreen>
                                </iframe>  
                            </div>
                        </div>
                    </div>

                    <div className="bando">
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345090075!2d144.95373631531085!3d-37.81627927975156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5777cb6a8ab1b52!2sGoogle!5e0!3m2!1sen!2sau!4v1614629820025!5m2!1sen!2sau"
                            width="100%"
                            height="400"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            <Footer/>
        </Fragment>
    );
};

export default About;
