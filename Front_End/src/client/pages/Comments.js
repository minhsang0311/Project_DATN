import React, { useState, useEffect } from 'react';
import '../styles/components/Comments.css'
const Comments = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [username, setUsername] = useState('');
    const [rating, setRating] = useState(5);

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

        const newCommentData = {
            User_ID: 1, // Bạn có thể thay thế bằng ID người dùng thật
            Product_ID: productId,
            Ratting: rating,
            Comment: newComment,
            User_Name: username,
            Show_Hidden: 1
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
            if (data.message === 'Thêm bình luận thành công') {
                // Cập nhật lại danh sách bình luận sau khi thêm mới
                setComments([...comments, newCommentData]);
                setNewComment(''); // Xóa nội dung bình luận sau khi gửi
                setUsername('');
            }
        } catch (err) {
            console.error('Lỗi khi thêm bình luận:', err);
        }
    };

    return (
        <div className="comments-section">
            <h3>Bình luận</h3>
            <ul>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <li key={comment.Review_ID}>
                            <strong>{comment.User_Name}:</strong> {comment.Comment} - {comment.Ratting}★
                        </li>
                    ))
                ) : (
                    <li>Chưa có bình luận nào.</li>
                )}
            </ul>

            <h4>Thêm bình luận mới</h4>
            <form onSubmit={handleAddComment}>
                <input
                    type="text"
                    placeholder="Tên của bạn"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
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
        </div>
    );
};

export default Comments;
