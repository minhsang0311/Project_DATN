// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, clearCart } from './cartSlice';

// const Cart = () => {
//     const cartItems = useSelector((state) => state.cart.items);
//     const total = useSelector((state) => state.cart.total);
//     const dispatch = useDispatch();

//     return (
//         <div>
//             <h2>Giỏ Hàng</h2>
//             {cartItems.length === 0 ? (
//                 <p>Giỏ hàng trống.</p>
//             ) : (
//                 cartItems.map((item) => (
//                     <div key={item.id}>
//                         <p>{item.name} - {item.price}đ x {item.quantity}</p>
//                         <button onClick={() => dispatch(removeFromCart(item.id))}>Xóa</button>
//                     </div>
//                 ))
//             )}
//             <p>Tổng cộng: {total}đ</p>
//             <button onClick={() => dispatch(clearCart())}>Xóa toàn bộ giỏ hàng</button>
//         </div>
//     );
// };

// export default Cart;
