import React, { useState, useEffect } from 'react';
import '../../styles/pages/commentList.css';
const Comments = () => {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch('http://localhost:3000/admin/reviews');
                const data = await response.json();
                setComments(data);
            } catch (err) {
                setError('Lỗi khi lấy dữ liệu bình luận');
            }
        };
        fetchComments();
    }, []);
    const handleVisibilityToggle = async (id, currentStatus) => {
        const newStatus = currentStatus === 1 ? 0 : 1;
        try {
            const response = await fetch(`http://localhost:3000/admin/reviews/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Show_Hidden: newStatus })
            });
            const data = await response.json();
            alert(data.message);
            // Cập nhật lại trạng thái hiển thị trong danh sách
            setComments(comments.map(comment => comment.Review_ID === id ? { ...comment, Show_Hidden: newStatus } : comment));
        } catch (err) {
            setError('Lỗi khi cập nhật trạng thái hiển thị');
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="admin-comments">
            <h1>Quản lý Bình luận</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Người dùng</th>
                        <th>Bình luận</th>
                        <th>Trạng thái</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {comments.map(comment => (
                        <tr key={comment.Review_ID}>
                            <td>{comment.Review_ID}</td>
                            <td>{comment.User_Name}</td>
                            <td>{comment.Comment}</td>
                            <td>{comment.Show_Hidden === 1 ? 'Hiển thị' : 'Ẩn'}/
                                <button onClick={() => handleVisibilityToggle(comment.Review_ID, comment.Show_Hidden)}>
                                    {comment.Show_Hidden === 1 ? 'Ẩn' : 'Hiển thị'}
                                </button>
                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Comments;
