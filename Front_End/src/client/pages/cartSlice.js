// src/pages/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cart')) || [], // Khôi phục giỏ hàng từ localStorage
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1; // Tăng số lượng nếu sản phẩm đã có
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Thêm sản phẩm mới
      }
      localStorage.setItem('cart', JSON.stringify(state.items)); // Cập nhật localStorage
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items)); // Cập nhật localStorage
    },
    clearCart: (state) => {
      state.items = []; // Xóa tất cả sản phẩm trong giỏ hàng
      localStorage.removeItem('cart'); // Xóa dữ liệu trong localStorage
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1; // Tăng số lượng
        localStorage.setItem('cart', JSON.stringify(state.items)); // Cập nhật localStorage
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1; // Giảm số lượng nếu lớn hơn 1
        localStorage.setItem('cart', JSON.stringify(state.items)); // Cập nhật localStorage
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
