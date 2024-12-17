const db = require('../../config/db');

// Lấy danh sách tất cả brand 
exports.getAllBrands = (req, res) => {
  const query = 'SELECT * FROM brands';

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Error fetching brands' });
    } else {
      res.status(200).json(results);
    }
  });
};

// Thêm mới một brand (without image)
exports.addBrand = (req, res) => {
  console.log("Request Body:", req.body);
  
  const { Brand_Name } = req.body;

  // Ensure Brand_Name is provided
  if (!Brand_Name) {
      console.log("Missing Brand_Name in request body");
      return res.status(400).json({ message: 'Brand name is required' });
  }

  // Insert into database (without image)
  const query = 'INSERT INTO brands (Brand_Name) VALUES (?)';
  const values = [Brand_Name];

  db.query(query, values, (error, result) => {
      if (error) {
          console.error("Database error:", error);
          return res.status(500).json({ message: 'Error adding brand' });
      }

      console.log("Brand added successfully with ID:", result.insertId);
      res.status(201).json({ message: 'Brand added successfully', brandId: result.insertId });
  });
};



// Lấy thông tin nhà sản xuất theo Brand_ID
exports.getManufacturerById = (req, res) => {
  const { id } = req.params;  // Lấy Brand_ID từ tham số URL

  if (!id) {
    console.log("Thiếu Brand_ID trong tham số yêu cầu");
    return res.status(400).json({ message: 'Brand ID là bắt buộc' });
  }

  const query = 'SELECT * FROM brands WHERE Brand_ID = ?'; // Truy vấn SQL để lấy thông tin nhà sản xuất

  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Lỗi cơ sở dữ liệu:", error);
      return res.status(500).json({ message: 'Lỗi khi lấy thông tin nhà sản xuất' });
    }

    if (results.length === 0) {
      console.log("Không tìm thấy nhà sản xuất với ID:", id);
      return res.status(404).json({ message: 'Không tìm thấy nhà sản xuất' });
    }

    console.log("Tìm thấy nhà sản xuất với ID:", id);
    res.status(200).json(results[0]); // Trả về kết quả đầu tiên
  });
};


// Cập nhật thông tin nhà sản xuất (without image)
exports.updateBrand = (req, res) => {
  const { id } = req.params; 
  const { Brand_Name } = req.body;

  if (!id) {
    console.log("Thiếu Brand_ID trong tham số yêu cầu");
    return res.status(400).json({ message: 'Brand ID là bắt buộc' });
  }

  if (!Brand_Name) {
    console.log("Thiếu thông tin cập nhật");
    return res.status(400).json({ message: 'Cần ít nhất một trường thông tin để cập nhật' });
  }

  const querySelect = 'SELECT * FROM brands WHERE Brand_ID = ?';
  db.query(querySelect, [id], (error, results) => {
    if (error) {
      console.error("Lỗi cơ sở dữ liệu khi lấy thông tin hiện tại:", error);
      return res.status(500).json({ message: 'Lỗi khi lấy thông tin nhà sản xuất' });
    }

    if (results.length === 0) {
      console.log("Không tìm thấy nhà sản xuất với ID:", id);
      return res.status(404).json({ message: 'Không tìm thấy nhà sản xuất' });
    }

    let queryUpdate = 'UPDATE brands SET ';
    const values = [];

    if (Brand_Name) {
      queryUpdate += 'Brand_Name = ?, ';
      values.push(Brand_Name);
    }

    // Remove the part for Brand_Image since it's not being updated
    queryUpdate = queryUpdate.slice(0, -2); // Remove trailing comma and space
    queryUpdate += ' WHERE Brand_ID = ?';
    values.push(id);

    db.query(queryUpdate, values, (error, result) => {
      if (error) {
        console.error("Lỗi cơ sở dữ liệu khi cập nhật:", error);
        return res.status(500).json({ message: 'Lỗi khi cập nhật nhà sản xuất' });
      }

      console.log("Thông tin nhà sản xuất đã được cập nhật với ID:", id);
      res.status(200).json({ message: 'Thông tin nhà sản xuất đã được cập nhật thành công' });
    });
  });
};



// xóa nhà sản xuất khi trong nhà sản xuất không có sản phẩm nào thì mới xóa được
// nếu có sản phẩm thì in ra nhà sản xuất có sản phẩm không xóa được

exports.deleteBrand = (req, res) => {
  const { id } = req.params; // Lấy Brand_ID từ tham số URL

  if (!id) {
    console.log("Thiếu Brand_ID trong tham số yêu cầu");
    return res.status(400).json({ message: 'Brand ID là bắt buộc' });
  }

  // Kiểm tra xem thương hiệu có sản phẩm nào liên quan không
  const queryCheckProducts = 'SELECT * FROM products WHERE Brand_ID = ?';
  db.query(queryCheckProducts, [id], (error, results) => {
    if (error) {
      console.error("Lỗi khi kiểm tra sản phẩm liên quan:", error);
      return res.status(500).json({ message: 'Lỗi khi kiểm tra sản phẩm trong cơ sở dữ liệu' });
    }

    if (results.length > 0) {
      // Nếu có sản phẩm, thông báo rõ ràng và không thực hiện xóa
      console.log("Trong nhà sản xuất này còn có sản phẩm, không thể xóa.");
      return res.status(400).json({ message: 'Trong nhà sản xuất này còn có sản phẩm, không thể xóa.' });
    }

    // Nếu không có sản phẩm nào liên quan, tiến hành xóa thương hiệu
    const queryDelete = 'DELETE FROM brands WHERE Brand_ID = ?';
    db.query(queryDelete, [id], (error, result) => {
      if (error) {
        console.error("Lỗi khi xóa thương hiệu:", error);
        return res.status(500).json({ message: 'Lỗi khi xóa thương hiệu trong cơ sở dữ liệu' });
      }

      if (result.affectedRows === 0) {
        console.log("Không tìm thấy thương hiệu với ID:", id);
        return res.status(404).json({ message: 'Không tìm thấy thương hiệu để xóa' });
      }

      console.log("Thương hiệu đã được xóa với ID:", id);
      return res.status(200).json({ message: 'Thương hiệu đã được xóa thành công' });
    });
  });
};



