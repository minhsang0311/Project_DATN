import React, { useState, useEffect } from 'react';
import '../styles/components/Comments.css';

const Comments = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(5);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserId(user.id);
            setUsername(user.username);
        }
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/user/reviews/${productId}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setComments(data);
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || 'Không có bình luận cho sản phẩm này.');
                }
            } catch (error) {
                console.error('Lỗi khi lấy bình luận:', error);
                setError('Không thể tải bình luận.');
            }
        };

        fetchComments();
    }, [productId]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const newCommentData = {
            User_ID: userId,
            Product_ID: productId,
            Ratting: rating,
            Comment: newComment,
            User_Name: username,
            Show_Hidden: 1,
        };

        try {
            const response = await fetch(`http://localhost:3000/user/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCommentData),
            });

            const data = await response.json();
            if (response.ok) {
                setNewComment('');
                setComments((prev) => [...prev, { ...newCommentData, Review_ID: data.reviewId }]);
                setSuccess(data.message || 'Thêm bình luận thành công!');
            } else {
                setError(data.message || 'Không thể thêm bình luận.');
            }
        } catch (error) {
            console.error('Lỗi khi thêm bình luận:', error);
            setError('Không thể gửi bình luận.');
        }
    };

    const renderStars = (ratting) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= ratting ? 'star filled' : 'star'}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="comments-section">
        <h3>Bình luận</h3>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <ul>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <li key={comment.Review_ID} className="comment-item">
                        <img
                            src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                            alt={comment.User_Name}
                            className="user-avatar"
                        />
                        <div className="comment-content">
                            <strong>{comment.User_Name}</strong>
                            <div className="stars">{renderStars(comment.Ratting)}</div>
                            <p>{comment.Comment}</p>
                        </div>
                    </li>
                ))
            ) : (
                <li></li>
            )}
        </ul>
    
        <form onSubmit={handleAddComment}>
            <textarea
                placeholder="Nội dung bình luận"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
            />
            <label>
                Đánh giá:
                <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                >
                    <option value={5}>5 sao</option>
                    <option value={4}>4 sao</option>
                    <option value={3}>3 sao</option>
                    <option value={2}>2 sao</option>
                    <option value={1}>1 sao</option>
                </select>
            </label>
            <button type="submit">Gửi bình luận</button>
        </form>
    </div>
    
    );
};

export default Comments;
