import React, { useState, useEffect } from 'react';
import '../styles/components/Comments.css';

const Comments = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [username, setUsername] = useState('');
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [hasPurchased, setHasPurchased] = useState(false);

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

    // Kiểm tra người dùng đã mua sản phẩm này chưa
    useEffect(() => {
    const fetchPurchaseHistory = async () => {
        if (userId) {
            try {
                const response = await fetch(`http://localhost:3000/user/purchases/${userId}`);
                
                // Kiểm tra nếu API trả về danh sách các sản phẩm đã mua
                if (response.ok) {
                    const data = await response.json();
                    const purchasedProductIds = data;  // Dữ liệu trả về là mảng chứa các Product_ID

                    if (purchasedProductIds.includes(productId)) {
                        setHasPurchased(true);  // Người dùng đã mua sản phẩm
                    } else {
                        setHasPurchased(false);  // Người dùng chưa mua sản phẩm
                    }
                } else {
                    console.error('Không thể lấy lịch sử mua hàng');
                    setHasPurchased(false);
                }
            } catch (err) {
                console.error('Lỗi khi kiểm tra lịch sử mua hàng:', err);
                setHasPurchased(false);
            }
        } else {
            console.log('Người dùng chưa đăng nhập');
            setHasPurchased(false);
        }
    };

    fetchPurchaseHistory();
}, [userId, productId]);  // Cập nhật khi productId hoặc userId thay đổi


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
            alert('Vui lòng đăng nhập để bình luận!');
            return;
        }

        if (!hasPurchased) {
            alert('Bạn chưa mua sản phẩm này, không thể bình luận!');
            return;
        }

        const newCommentData = {
            User_ID: userId,
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
                            <img
                                src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                                alt={comment.User_Name}
                                className="user-avatar"
                            />
                            <div className="comment-content">
                                <strong>{comment.User_Name}</strong>
                                <div className="rating">
                                    {renderStars(comment.Ratting)}
                                </div>
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
            {message && <p>{message}</p>}
        </div>
    );
};

export default Comments;
