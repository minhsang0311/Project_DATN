const db = require('../../config/db');

exports.getWishlist = async (req, res) => {
    const { userId } = req.params;

    try {
        const wishlist = await db.query(
            `SELECT Products.* 
             FROM Wishlist 
             JOIN Products ON Wishlist.Product_ID = Products.Product_ID
             WHERE Wishlist.User_ID = ?`,
            [userId]
        );

        res.status(200).json(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách yêu thích.' });
    }
}

exports.postWishlist = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const existing = await db.query(
            'SELECT * FROM Wishlist WHERE User_ID = ? AND Product_ID = ?',
            [userId, productId]
        );
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Sản phẩm đã có trong danh sách yêu thích.' });
        }
        await db.query('INSERT INTO Wishlist (User_ID, Product_ID) VALUES (?, ?)', [userId, productId]);

        res.status(200).json({ message: 'Thêm vào danh sách yêu thích thành công.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Lỗi khi thêm sản phẩm yêu thích.', error });
    }
}

// Xóa sản phẩm yêu thích
exports.deleteWishlist = async (req, res) => {
    const { userId, productId } = req.body; // Lấy userId và productId từ body
    try {
        if (!userId || !productId) {
            return res.status(400).json({ message: 'Thiếu userId hoặc productId.' });
        }

        // Xóa sản phẩm yêu thích trong database
        await db.query('DELETE FROM Wishlist WHERE User_ID = ? AND Product_ID = ?', [userId, productId]);
        res.status(200).json({ message: 'Đã xóa sản phẩm khỏi danh sách yêu thích.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi xóa sản phẩm yêu thích.' });
    }
};

