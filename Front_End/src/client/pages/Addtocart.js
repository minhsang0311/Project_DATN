// import React, { useState } from 'react';
// import '../styles/components/Addtocart.css';

// const Addtocart = () => {
//     // Khởi tạo state để lưu sản phẩm trong giỏ hàng
//     const [cart, setCart] = useState([{
//         name: 'Hút mùi YAMATO YT-269H-S',
//         price: 11500000,
//         quantity: 1
//     }]);

//     // Hàm tính tổng số tiền
//     const calculateTotal = () => {
//         return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
//     };

//     // Hàm cập nhật số lượng sản phẩm
//     const updateQuantity = (index, newQuantity) => {
//         if (newQuantity < 1) return; // Basic validation to prevent quantity < 1
//         const updatedCart = [...cart];
//         updatedCart[index].quantity = newQuantity;
//         setCart(updatedCart);
//     };

//     // Hàm xóa sản phẩm khỏi giỏ
//     const removeItem = (index) => {
//         const updatedCart = cart.filter((_, i) => i !== index);
//         setCart(updatedCart);
//     };

//     // Bảng hiển thị sản phẩm
//     const ProductTable = () => (
//         <table>
//             <thead>
//                 <tr>
//                     <th>#</th>
//                     <th>Sản Phẩm</th>
//                     <th>Giá</th>
//                     <th>Số lượng</th>
//                     <th>Tổng</th>
//                     <th>Thao tác</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {cart.map((item, index) => (
//                     <tr key={index}>
//                         <td>{index + 1}</td>
//                         <td>{item.name}</td>
//                         <td>{item.price.toLocaleString('vi-VN')}₫</td>
//                         <td>
//                             <input type="number" value={item.quantity}  min="1" onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}/>
//                         </td>
//                         <td>{(item.price * item.quantity).toLocaleString('vi-VN')}₫</td>
//                         <td>
//                         <button className="remove" onClick={() => removeItem(index)}>Xóa</button>

//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );

//     return (
//         <div className="cart">
//             <h2 className="product-header">GIỎ HÀNG</h2>
//             <ProductTable />
//             <div className="total">
//             <table>
//             <thead>
//                 <tr>
//                     <th>Tạm tính:</th>
//                     <td><span className="subtotal">{calculateTotal().toLocaleString('vi-VN')}₫</span></td>
//                 </tr>
//             </thead>
//             <tbody>
//                 <th>Tổng:</th>
//                 <td><span className="grand-total">{calculateTotal().toLocaleString('vi-VN')}₫</span></td>
//             </tbody>
//             </table>
//             <button className="checkout">Thanh toán</button>        
//             </div>
            
//         </div>
//     );
// };

// export default Addtocart;

// export default CartPage;
