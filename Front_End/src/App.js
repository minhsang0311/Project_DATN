import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import Cart from './client/giohang/cart';
import Checkout from './client/giohang/checkout';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Định nghĩa các route */}
        <Routes>
          <Route path="/cart" element={<Cart />} /> {/* Trang giỏ hàng */}
          <Route path="/checkout" element={<Checkout />} /> {/* Trang thanh toán */}
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
