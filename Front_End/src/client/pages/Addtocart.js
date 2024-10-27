// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import '../styles/components/CartPage.css';

// function CartPage() {
//     const location = useLocation();
//     const { cart } = location.state || {}; 
//     const [cartItems, setCartItems] = useState([]);

//     useEffect(() => {
//         const savedCart = JSON.parse(localStorage.getItem('cart')) || cart || [];
//         setCartItems(savedCart);
//     }, [cart]);

//     // Update localStorage whenever cartItems changes
//     useEffect(() => {
//         localStorage.setItem('cart', JSON.stringify(cartItems));
//     }, [cartItems]);

//     // Update item quantity
//     const handleQuantityChange = (productId, newQuantity) => {
//         if (newQuantity < 1) return;

//         setCartItems(prevItems => {
//             const updatedItems = prevItems.map(item =>
//                 item.Product_ID === productId
//                     ? { ...item, quantity: newQuantity }
//                     : item
//             );
//             // Update localStorage to persist changes
//             localStorage.setItem('cart', JSON.stringify(updatedItems));
//             return updatedItems;
//         });
//     };

//     const handleRemoveItem = (productId) => {
//         setCartItems(prevItems => {
//             const updatedItems = prevItems.filter(item => item.Product_ID !== productId);
//             if (updatedItems.length === 0) {
//                 localStorage.removeItem('cart');
//             } else {
//                 localStorage.setItem('cart', JSON.stringify(updatedItems));
//             }
//             return updatedItems;
//         });
//     };

//     const calculateTotal = () => {
//         return cartItems.reduce((total, item) => {
//             const itemTotal = item.Price * (item.quantity || 1);
//             return total + itemTotal;
//         }, 0);
//     };

//     return (
//         <div>
//             <h1>Giỏ Hàng</h1>
//             {cartItems.length > 0 ? (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Tên Sản Phẩm</th>
//                             <th>Giá</th>
//                             <th>Số Lượng</th>
//                             <th>Tổng Tiền</th>
//                             <th>Hành Động</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {cartItems.map((item, index) => (
//                             <tr key={item.Product_ID}>
//                                 <td>{index + 1}</td>
//                                 <td>{item.Product_Name}</td>
//                                 <td>{item.Price.toLocaleString()}đ</td>
//                                 <td>
//                                     <input
//                                         type="number"
//                                         min="1"
//                                         value={item.quantity || 1}
//                                         onChange={(e) => handleQuantityChange(item.Product_ID, Number(e.target.value))}
//                                     />
//                                 </td>
//                                 <td>{(item.Price * (item.quantity || 1)).toLocaleString()}đ</td>
//                                 <td>
//                                     <button className="buttonXoa" onClick={() => handleRemoveItem(item.Product_ID)}>Xóa</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>Giỏ hàng của bạn trống.</p>
//             )}
//             {cartItems.length > 0 && (
//                 <div>
//                     <h3 className="tongtien">Tổng Tiền: {calculateTotal().toLocaleString()}đ</h3>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default CartPage;
