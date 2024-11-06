import React, { useState, useEffect } from 'react';
import '../styles/components/Comments.css';

const Comments = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [username, setUsername] = useState('');
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);

    // Lấy thông tin người dùng từ localStorage khi component load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.role === 0) {
                setUsername(user.username);
                setUserId(user.id); // Lấy User_ID từ localStorage
            }
        }
    }, []);

    // Lấy danh sách bình luận từ API khi component được load
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/reviews/${productId}`);
                const data = await response.json();
                setComments(data);
            } catch (err) {
                console.error('Lỗi khi lấy bình luận:', err);
            }
        };

        fetchComments();
    }, [productId]);

    // Xử lý thêm bình luận mới
    const handleAddComment = async (e) => {
        e.preventDefault();

        if (!userId) {
            setMessage('Vui lòng đăng nhập để bình luận!');
            return;
        }

        const newCommentData = {
            User_ID: userId,
            Product_ID: productId,
            Rating: rating,
            Comment: newComment,
            User_Name: username,
            Show_Hidden: 1
        };

        try {
            const response = await fetch(`http://localhost:3000/user/reviews/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCommentData),
            });

            const data = await response.json();
            if (data.message === 'Thêm bình luận thành công') {
                // Cập nhật lại danh sách bình luận sau khi thêm mới
                const fetchUpdatedComments = async () => {
                    const response = await fetch(`http://localhost:3000/user/reviews/${productId}`);
                    const updatedData = await response.json();
                    setComments(updatedData);
                };
                fetchUpdatedComments();

                setNewComment('');
                alert('Bình luận của bạn đã được gửi thành công!');
            }
        } catch (err) {
            console.error('Lỗi khi thêm bình luận:', err);
            setMessage('Lỗi khi gửi bình luận. Vui lòng thử lại sau.');
        }
    };

    // Hàm để hiển thị sao
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={i < rating ? 'filled' : 'empty'}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="comments-section">
            <h3>Bình luận</h3>
            <ul>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <li key={comment.Review_ID} className="comment-item">
                            {/* Hiển thị ảnh người dùng */}
                            <img
                                src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                                alt={comment.User_Name}
                                className="user-avatar"
                            />

                            <div className="comment-content">
                                {/* Tên người dùng */}
                                <strong>{comment.User_Name}</strong>

                                {/* Hiển thị sao */}
                                <div className="rating">
                                    {renderStars(comment.Rating)}
                                </div>

                                {/* Nội dung bình luận */}
                                <p>{comment.Comment}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>Chưa có bình luận nào.</li>
                )}
            </ul>


            <h4>Thêm bình luận mới</h4>
            <form onSubmit={handleAddComment}>
                <textarea
                    placeholder="Nội dung bình luận"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                />
                <label>
                    Đánh giá:
                    <select value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value={5}>5</option>
                        <option value={4}>4</option>
                        <option value={3}>3</option>
                        <option value={2}>2</option>
                        <option value={1}>1</option>
                    </select>
                </label>
                <button type="submit">Gửi bình luận</button>
            </form>

            {/* Thông báo thành công hoặc lỗi */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Comments;
